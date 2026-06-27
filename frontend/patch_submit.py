import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Update removeFile
remove_file_search = """  const removeFile = (type: "resume" | "screenshot") => {
    if (type === "resume") {
      setFormState((prev) => ({
        ...prev,
        documents: { ...prev.documents, resume: null }
      }));
    } else {"""
remove_file_replace = """  const removeFile = (type: "resume" | "screenshot" | "photo" | "passbook") => {
    if (type === "resume") {
      setFormState((prev) => ({
        ...prev,
        documents: { ...prev.documents, resume: null }
      }));
    } else if (type === "photo") {
      setFormState((prev) => ({
        ...prev,
        personalInformation: { ...prev.personalInformation, photo: null }
      }));
    } else if (type === "passbook") {
      setFormState((prev) => ({
        ...prev,
        documents: { ...prev.documents, passbook: null }
      }));
    } else {"""
content = content.replace(remove_file_search, remove_file_replace)

# Update handleFinalSubmit and executeSubmit
submit_search = """  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    for (let i = 0; i < steps.length - 1; i++) {
      if (!isStepValid(i)) {
        const stepErrors = validateStepFields(i);
        setErrors(stepErrors);
        setCurrentStep(i);
        setIsSubmitting(false);
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    try {"""

submit_replace = """  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    for (let i = 0; i < steps.length - 1; i++) {
      if (!isStepValid(i)) {
        const stepErrors = validateStepFields(i);
        setErrors(stepErrors);
        setCurrentStep(i);
        setIsSubmitting(false);
        topRef.current?.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    if (internshipType === "paid") {
      setIsSubmitting(false);
      setShowPaymentModal(true);
      return;
    }

    await executeSubmit();
  };

  const executeSubmit = async () => {
    setIsSubmitting(true);
    try {"""
content = content.replace(submit_search, submit_replace)

# Add photo and passbook to payload
payload_search = """        personalInformation: {
          firstName: sanitizeText(formState.personalInformation.firstName),"""
payload_replace = """        personalInformation: {
          photo: sanitizeFileData(formState.personalInformation.photo),
          firstName: sanitizeText(formState.personalInformation.firstName),"""
content = content.replace(payload_search, payload_replace)

payload_docs_search = """        documents: {
          resume: sanitizeFileData(formState.documents.resume),
        },"""
payload_docs_replace = """        documents: {
          resume: sanitizeFileData(formState.documents.resume),
          passbook: sanitizeFileData(formState.documents.passbook),
        },"""
content = content.replace(payload_docs_search, payload_docs_replace)

with open(file_path, "w") as f:
    f.write(content)
print("Patch 3 done")
