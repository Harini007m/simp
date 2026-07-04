import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text, select
from app.models.authentication.user import User
from app.models.rbac.role import Role
from app.models.rbac.user_role import UserRole
from app.core.security import hash_password
from app.models.core.enums.status import StatusEnum
import os
import uuid
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def create_superadmin():
    async with AsyncSessionLocal() as session:
        # Check if SUPER_ADMIN role exists
        res = await session.execute(select(Role).where(Role.code == 'SUPER_ADMIN'))
        role = res.scalars().first()
        if not role:
            print("SUPER_ADMIN role not found! Please seed the database first.")
            return

        # Check if user exists
        email = "admin@pinesphere.com"
        res = await session.execute(select(User).where(User.email == email))
        user = res.scalars().first()
        
        if not user:
            print("Creating superadmin user...")
            user = User(
                id=uuid.uuid4(),
                username="superadmin",
                email=email,
                phone="+919876543210",
                password_hash=hash_password("ChangeMe@123"),
                account_status=StatusEnum.ACTIVE.value,
                email_verified=True,
                phone_verified=True
            )
            session.add(user)
            await session.flush()
        else:
            print("User already exists. Updating password and status...")
            user.password_hash = hash_password("ChangeMe@123")
            user.account_status = StatusEnum.ACTIVE.value
            
        # Check if user is mapped to SUPER_ADMIN role
        res = await session.execute(
            select(UserRole).where(UserRole.user_id == user.id, UserRole.role_id == role.id)
        )
        user_role = res.scalars().first()
        if not user_role:
            print("Assigning SUPER_ADMIN role to user...")
            ur = UserRole(
                id=uuid.uuid4(),
                user_id=user.id,
                role_id=role.id
            )
            session.add(ur)

        await session.commit()
        print("Superadmin user setup successfully!")

if __name__ == "__main__":
    asyncio.run(create_superadmin())
