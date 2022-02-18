import mongoose from "mongoose";

const transaction = async (handle: any) => {
    const session = await mongoose.startSession();

    await session.withTransaction(async () => {
        await handle(session);
    });
};

export default transaction;
