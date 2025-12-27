import { db } from "../../config/db"
import { users } from "../../db/schema/users"
import { eq } from "drizzle-orm"
import { InternalServerError } from "../../utils/errors"

export class UserRepository {
    findUserByEmail = async (email: string) => {
        return await db.select().from(users).where(eq(users.email, email)).limit(1)
    }

    createUser = async (data: { email: string, name: string, password: string }) => {
        const [user] = await db.insert(users).values(data).returning()
        if (!user) throw new InternalServerError("Failed to create user")

        return user
    }
}