import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# 1. Update ApplicationState
content = content.replace("state: string;", "state: string;\n    photo: FileData | null;")
content = content.replace("resume: FileData | null;", "resume: FileData | null;\n    passbook: FileData | null;")

# 2. Update initialFormState
content = content.replace("state: \"\",\n  },", "state: \"\",\n    photo: null,\n  },")
content = content.replace("resume: null,\n  },", "resume: null,\n    passbook: null,\n  },")

# 3. Add validations
# Step 0
step_0_validation_search = """      if (!state || !state.trim()) {
        stepErrors.state = "State is required.";
      }"""
step_0_validation_replace = """      if (!state || !state.trim()) {
        stepErrors.state = "State is required.";
      }
      if (!formState.personalInformation.photo) {
        stepErrors.photo = "Passport size photo is required.";
      }"""
content = content.replace(step_0_validation_search, step_0_validation_replace)

# Step 4 (Documents)
step_4_validation_search = """    if (stepIdx === 4) {
      const { resume } = formState.documents;
      if (!resume) stepErrors.resume = "Resume PDF file is required.";
    }"""
step_4_validation_replace = """    if (stepIdx === 4) {
      const { resume, passbook } = formState.documents;
      if (!resume) stepErrors.resume = "Resume PDF file is required.";
      if (internshipType === "stipend" && !passbook) {
        stepErrors.passbook = "Passbook/Bank document is required for stipend processing.";
      }
    }"""
content = content.replace(step_4_validation_search, step_4_validation_replace)

# Remove manual transaction fields from paid validation
paid_validation_search = """      if (internshipType === "paid") {
        const { feeAcceptance, paymentMode, transactionId, paymentScreenshot } = formState.internshipSpecificData;
        if (!feeAcceptance) stepErrors.feeAcceptance = "You must accept the fee guidelines.";
        if (!paymentMode) stepErrors.paymentMode = "Please select a payment mode.";
        if (!transactionId || transactionId.trim().length < 6) {
          stepErrors.transactionId = "Transaction ID must be at least 6 characters.";
        }
        if (!paymentScreenshot) stepErrors.paymentScreenshot = "Please upload payment receipt screenshot.";
      }"""
paid_validation_replace = """      if (internshipType === "paid") {
        const { feeAcceptance } = formState.internshipSpecificData;
        if (!feeAcceptance) stepErrors.feeAcceptance = "You must accept the fee guidelines.";
      }"""
content = content.replace(paid_validation_search, paid_validation_replace)

with open(file_path, "w") as f:
    f.write(content)
print("Patch 1 done")
