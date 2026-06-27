import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# 1. Add showPaymentModal state
state_search = "const [isSubmitting, setIsSubmitting] = useState(false);"
state_replace = "const [isSubmitting, setIsSubmitting] = useState(false);\n  const [showPaymentModal, setShowPaymentModal] = useState(false);\n  const [isProcessingPayment, setIsProcessingPayment] = useState(false);"
content = content.replace(state_search, state_replace)

# 2. Update processFile
process_file_search = """  const processFile = (file: File, type: "resume" | "screenshot") => {"""
process_file_replace = """  const processFile = (file: File, type: "resume" | "screenshot" | "photo" | "passbook") => {"""
content = content.replace(process_file_search, process_file_replace)

# Add validation for photo and passbook in processFile
validation_search = """      if (file.size > maxResumeSize) {
        setErrors((prev) => ({ ...prev, resume: "Resume size must be under 10MB." }));
        return;
      }
    } else {"""
validation_replace = """      if (file.size > maxResumeSize) {
        setErrors((prev) => ({ ...prev, resume: "Resume size must be under 10MB." }));
        return;
      }
    } else if (type === "photo") {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, photo: "Only image files (JPEG, PNG, WEBP) are accepted." }));
        return;
      }
      if (file.size > maxScreenshotSize) {
        setErrors((prev) => ({ ...prev, photo: "Photo size must be under 5MB." }));
        return;
      }
    } else if (type === "passbook") {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, passbook: "Accepted files: JPEG, PNG, WEBP, or PDF." }));
        return;
      }
      if (file.size > maxScreenshotSize) {
        setErrors((prev) => ({ ...prev, passbook: "Passbook size must be under 5MB." }));
        return;
      }
    } else {"""
content = content.replace(validation_search, validation_replace)

# Update state setting in processFile
state_setting_search = """      if (type === "resume") {
        setFormState((prev) => ({
          ...prev,
          documents: { ...prev.documents, resume: fileObj }
        }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      } else {"""
state_setting_replace = """      if (type === "resume") {
        setFormState((prev) => ({
          ...prev,
          documents: { ...prev.documents, resume: fileObj }
        }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      } else if (type === "photo") {
        setFormState((prev) => ({
          ...prev,
          personalInformation: { ...prev.personalInformation, photo: fileObj }
        }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.photo;
          return next;
        });
      } else if (type === "passbook") {
        setFormState((prev) => ({
          ...prev,
          documents: { ...prev.documents, passbook: fileObj }
        }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.passbook;
          return next;
        });
      } else {"""
content = content.replace(state_setting_search, state_setting_replace)

with open(file_path, "w") as f:
    f.write(content)
print("Patch 2 done")
