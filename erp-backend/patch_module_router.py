import re

with open("app/modules/rbac/module_router.py", "r") as f:
    content = f.read()

# get_modules and get_module
content = content.replace('"description": m.description,', '"description": m.description,\n            "route": m.route_path,')

# create_module
create_old = """    m = Module(
        name=data.name,
        code=data.code,
        description=data.description
    )"""
create_new = """    m = Module(
        name=data.name,
        code=data.code,
        description=data.description,
        route_path=data.route
    )"""
content = content.replace(create_old, create_new)

# update_module
update_old = "if data.description is not None: m.description = data.description"
update_new = "if data.description is not None: m.description = data.description\n    if data.route is not None: m.route_path = data.route"
content = content.replace(update_old, update_new)

with open("app/modules/rbac/module_router.py", "w") as f:
    f.write(content)
