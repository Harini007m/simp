import { Project, SyntaxKind } from "ts-morph";

const project = new Project();
project.addSourceFilesAtPaths("src/**/*.ts");

console.log("Cleaning api.client.ts...");
const apiClientFile = project.getSourceFile("src/api/api.client.ts");
if (apiClientFile) {
    const callExpr = apiClientFile.getDescendantsOfKind(SyntaxKind.CallExpression)
        .find(c => c.getExpression().getText() === "apiClient.interceptors.request.use");
    if (callExpr) {
        const args = callExpr.getArguments();
        if (args.length > 0) {
            args[0].replaceWithText("(config) => config");
        }
    }
}

console.log("Cleaning mock data files...");
const mockFiles = project.getSourceFiles("src/data/mock-*.ts");
for (const file of mockFiles) {
    const varDecls = file.getVariableStatements();
    for (const stmt of varDecls) {
        const decls = stmt.getDeclarations();
        if (decls.length > 0 && decls[0].getName().startsWith("MOCK_")) {
            stmt.remove();
        }
    }
}

console.log("Cleaning services and apis...");
const targetFiles = [...project.getSourceFiles("src/services/**/*.ts"), ...project.getSourceFiles("src/api/**/*.ts")];

for (const file of targetFiles) {
    if (file.getBaseName() === "api.client.ts") continue;
    
    // Remove MOCK_ imports
    const importDecls = file.getImportDeclarations();
    for (const imp of importDecls) {
        const namedImports = imp.getNamedImports();
        let removedSome = false;
        for (const named of namedImports) {
            if (named.getName().startsWith("MOCK_")) {
                named.remove();
                removedSome = true;
            }
        }
        if (imp.getNamedImports().length === 0 && imp.getDefaultImport() == null && imp.getNamespaceImport() == null && removedSome) {
            imp.remove();
        }
    }

    let needsApiClient = false;

    let done = false;
    while (!done) {
        const stmts = file.getDescendantsOfKind(SyntaxKind.ReturnStatement);
        let replaced = false;
        for (const stmt of stmts) {
            if (stmt.wasForgotten()) continue;
            const expr = stmt.getExpression();
            if (!expr) continue;
            const text = expr.getText();
            
            if (text.includes("Promise.resolve") && text.includes("MOCK_")) {
                needsApiClient = true;
                stmt.replaceWithText("const res = await apiClient.get<any>('/api/placeholder');\nreturn res.data;");
                replaced = true;
                break;
            }

            if (text.includes("MOCK_")) {
                stmt.replaceWithText("throw new Error('Backend implementation pending or failed');");
                replaced = true;
                break;
            }
        }
        if (!replaced) done = true;
    }

    if (needsApiClient) {
        if (!file.getImportDeclaration(i => i.getModuleSpecifierValue().includes("api.client"))) {
            const isService = file.getFilePath().includes("/services/");
            const relPath = isService ? "../api/api.client" : "./api.client";
            file.addImportDeclaration({
                namedImports: ["apiClient"],
                moduleSpecifier: relPath
            });
        }
    }
}

project.saveSync();
console.log("Cleanup complete!");
