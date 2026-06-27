import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Remove transaction details from Review section for paid
review_paid_search = """                    {internshipType === "paid" && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div><span className="text-slate-400">Payment Mode:</span> <span className="font-semibold text-slate-800">{formState.internshipSpecificData.paymentMode}</span></div>
                        <div><span className="text-slate-400">Transaction ID:</span> <span className="font-semibold text-slate-800">{formState.internshipSpecificData.transactionId}</span></div>
                        <div className="col-span-2 mt-1"><span className="text-slate-400">Verification Screenshot:</span> <span className="font-bold text-slate-800 bg-slate-50 px-2 py-1 border rounded">{formState.internshipSpecificData.paymentScreenshot?.name}</span></div>
                      </div>
                    )}"""
content = content.replace(review_paid_search, """                    {internshipType === "paid" && (
                      <div className="mt-2 text-blue-600 font-semibold italic">Payment will be processed in the next step.</div>
                    )}""")

# Add passbook to Review section
review_docs_search = """                  <div className="text-xs">
                    <div><span className="text-slate-400">Resume:</span> <span className="font-bold text-slate-800 bg-slate-50 px-3.5 py-1.5 border border-slate-150 rounded inline-block">{formState.documents.resume?.name} ({(formState.documents.resume ? formState.documents.resume.size / 1024 / 1024 : 0).toFixed(2)} MB)</span></div>
                  </div>"""
review_docs_replace = """                  <div className="text-xs space-y-2">
                    <div><span className="text-slate-400">Resume:</span> <span className="font-bold text-slate-800 bg-slate-50 px-3.5 py-1.5 border border-slate-150 rounded inline-block">{formState.documents.resume?.name} ({(formState.documents.resume ? formState.documents.resume.size / 1024 / 1024 : 0).toFixed(2)} MB)</span></div>
                    {internshipType === "stipend" && (
                      <div><span className="text-slate-400">Passbook:</span> <span className="font-bold text-slate-800 bg-slate-50 px-3.5 py-1.5 border border-slate-150 rounded inline-block">{formState.documents.passbook?.name} ({(formState.documents.passbook ? formState.documents.passbook.size / 1024 / 1024 : 0).toFixed(2)} MB)</span></div>
                    )}
                  </div>"""
content = content.replace(review_docs_search, review_docs_replace)

# Add PaymentModal logic before the main return statement of ApplicationFormContent
modal_code = """
  // Simulated Payment Modal logic
  const handlePaymentSimulation = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setShowPaymentModal(false);
      executeSubmit(); // Proceed with submission after "payment"
    }, 2500);
  };

  return (
    <div className="space-y-8">
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden flex flex-col">
            <div className="p-6 bg-blue-50/50 border-b border-blue-100 flex items-start gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Payment Gateway</h3>
                <p className="text-xs text-slate-500 mt-1">Complete your transaction to finalize the application.</p>
              </div>
            </div>
            
            <div className="p-6 text-center space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Amount Due</p>
                <p className="text-4xl font-extrabold text-slate-900 mt-1">₹1,500<span className="text-lg text-slate-400">.00</span></p>
              </div>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-left text-sm space-y-2">
                <div className="flex justify-between"><span className="text-slate-500">Program</span><span className="font-semibold text-slate-800 capitalize">{internshipType} Internship</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Applicant</span><span className="font-semibold text-slate-800">{formState.personalInformation.firstName} {formState.personalInformation.lastName}</span></div>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessingPayment}
                onClick={handlePaymentSimulation}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all disabled:opacity-80"
              >
                {isProcessingPayment ? (
                  <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>
                ) : (
                  <>Pay & Submit</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
"""
content = content.replace("  return (\n    <div className=\"space-y-8\">", modal_code)

with open(file_path, "w") as f:
    f.write(content)
print("Patch UI 4 done")
