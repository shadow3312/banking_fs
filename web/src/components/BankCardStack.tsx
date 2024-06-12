"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BankCard from "./BankCard";
import { move } from "@/lib/utils";
import { useRecoilState } from "recoil";
import { selectedBankAtom } from "@/state/atom";

const CARD_OFFSET = 10;
const SCALE_FACTOR = 0.06;

export default function BankCardStack({ banks }: BankCardStackProps) {
  const [cards, setCards] = useState(banks);
  const [visibleCardIndex, setVisibleCardIndex] = useState<number>(0);
  const [selectedBank, setSelectedBank] = useRecoilState(selectedBankAtom);

  const moveToEnd = (from: number) => {
    setCards(move(cards, from, cards.length - 1));
  };

  const handleDragEnd = (index: number) => {
    setVisibleCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    moveToEnd(index);
  };

  useEffect(() => {
    setSelectedBank(banks[visibleCardIndex]);
  }, [visibleCardIndex]);

  useEffect(() => {
    setSelectedBank(banks[0]);
  }, []);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      {cards.map((bank, index) => {
        const canDrag = index === 0;

        return (
          <motion.div key={bank.id}>
            <motion.div
              style={{
                position: "absolute",

                cursor: canDrag ? "grab" : "auto",
              }}
              className="h-full w-full"
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
                balance={bank.balance}
                type={bank.type}
                account_name={bank.account_name}
              />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}
