import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.rbac.module import Module

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        result = await db.execute(select(Module))
        modules = result.scalars().all()
        for m in modules:
            if not m.route_path:
                code = m.code.lower()
                if code == 'dashboard':
                    m.route_path = '/feature/dashboard'
                elif code == 'data_export_center':
                    m.route_path = '/feature/export'
                elif code == 'digital_id':
                    m.route_path = '/feature/digital-id'
                elif code == 'digital_id_card':
                    m.route_path = '/feature/digital-id/card'
                elif code == 'document':
                    m.route_path = '/feature/documents'
                else:
                    m.route_path = f'/feature/{code}'
                print(f"Set {code} route to {m.route_path}")
        await db.commit()
        print("Done!")

asyncio.run(run())
