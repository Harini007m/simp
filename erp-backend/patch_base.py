import re

with open("app/services/base.py", "r") as f:
    content = f.read()

execute_method = """    async def execute_with_integrity_check(self, coro):
        from sqlalchemy.exc import IntegrityError
        from fastapi import HTTPException
        try:
            return await coro
        except IntegrityError as e:
            await self.db.rollback()
            raise HTTPException(status_code=400, detail="Database integrity error: This record already exists or violates a constraint.")
        except HTTPException:
            raise
        except Exception as e:
            await self.db.rollback()
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    async def log_audit_event"""

content = content.replace("    async def log_audit_event", execute_method)

# create
create_old = "obj = await self.repository.create(self.db, obj_in=obj_in)"
create_new = "obj = await self.execute_with_integrity_check(self.repository.create(self.db, obj_in=obj_in))"
content = content.replace(create_old, create_new)

# update
update_old = "obj = await self.repository.update(self.db, db_obj=db_obj, obj_in=obj_in)"
update_new = "obj = await self.execute_with_integrity_check(self.repository.update(self.db, db_obj=db_obj, obj_in=obj_in))"
content = content.replace(update_old, update_new)

# delete
delete_old = "obj = await self.repository.delete(self.db, id=id)"
delete_new = "obj = await self.execute_with_integrity_check(self.repository.delete(self.db, id=id))"
content = content.replace(delete_old, delete_new)

with open("app/services/base.py", "w") as f:
    f.write(content)

