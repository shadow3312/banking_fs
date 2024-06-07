import bcrypt from "bcrypt";

export default function PasswordProvider(): IPasswordProvider {
  return Object.freeze({
    hash,
    compare,
  });

  async function hash(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }

  async function compare(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);

    return isMatch;
  }
}
