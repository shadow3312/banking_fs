"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BankCard from "./BankCard";
import { move } from "@/lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingActivityAtom, selectedBankAtom } from "@/state/atom";
import Spinner from "./Spinner";
import { useLoading } from "@/lib/hooks/useLoading";

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

export default function BankCardStack({ banks, user }: BankCardStackProps) {
  const [cards, setCards] = useState(banks);
  const [visibleCardIndex, setVisibleCardIndex] = useState<number>(0);
  const [selectedBank, setSelectedBank] = useRecoilState(selectedBankAtom);
  const [isLoading, setLoading] = useLoading("BankCard");

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  const handleDragEnd = (index: number) => {
    setVisibleCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    moveToEnd(index);
  };

  useEffect(() => {
    setSelectedBank(banks[visibleCardIndex || 0]);
  }, [visibleCardIndex, banks]);

  useEffect(() => {
    setSelectedBank(banks[0]);
  }, []);

  useEffect(() => {
    setCards(banks);
  }, [banks]);

  return (
    <div>
      <div
        style={{
          position: "relative",
        }}
      >
        {isLoading && (
          <div className="absolute bottom-0  left-0 right-0 top-0 z-50 grid h-[180px] w-full place-items-center rounded-xl bg-black/50">
            <Spinner large />
          </div>
        )}

        {cards.length === 0 && (
          <div className="flex items-center justify-center">
            <h4 className="text-lg">No bank account yet.</h4>
          </div>
        )}
        {cards.map((bank, index) => {
          const canDrag = index === 0;

          return (
            <motion.div key={bank.id}>
              <motion.div
                style={{
                  position: "absolute",

                  cursor: canDrag ? "grab" : "auto",
                }}
                className="grid h-full w-full place-items-center"
                animate={{
                  top: index * -CARD_OFFSET,
                  scale: 1 - index * SCALE_FACTOR,
                  zIndex: cards.length - index,
                }}
                drag={canDrag ? "y" : false}
                dragConstraints={{
                  top: 0,
                  bottom: 0,
                }}
                onDragEnd={() => {
                  handleDragEnd(index);
                }}
              >
                <BankCard
                  mask={bank.mask}
                  balance={bank.currentBalance}
                  type={bank.type}
                  account_name={`${user.firstName} ${user.lastName}`}
                />
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
