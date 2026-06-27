import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Remove old transaction and screenshot fields for Paid Internship
search_pattern = r'<div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">.*?</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*</div>\s*\)\}'
# Wait, this regex might be tricky. Let's do it with replace.
# Actually, I can just replace the block directly.
old_paid_code = """                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                    <div>
                      <label htmlFor="paymentMode" className="block text-xs font-bold text-slate-550 mb-2 uppercase tracking-wide">Payment Mode *</label>
                      <select
                        id="paymentMode"
                        name="paymentMode"
                        required
                        value={formState.internshipSpecificData.paymentMode}
                        onBlur={() => handleBlur("paymentMode")}
                        onChange={(e) => handleInputChange("internshipSpecificData", "paymentMode", e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white text-slate-800 transition-all ${
                          errors.paymentMode && touched.paymentMode ? "border-rose-500 bg-rose-50/20" : "border-slate-300"
                        }`}
                      >
                        <option value="">Select Mode</option>
                        <option value="UPI">UPI</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                      </select>
                      {errors.paymentMode && touched.paymentMode && (
                        <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1.5">
                          <WarningIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          {errors.paymentMode}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="transactionId" className="block text-xs font-bold text-slate-550 mb-2 uppercase tracking-wide">Transaction ID *</label>
                      <input
                        type="text"
                        id="transactionId"
                        name="transactionId"
                        required
                        placeholder="E.g. TXN987654321"
                        value={formState.internshipSpecificData.transactionId}
                        onBlur={() => handleBlur("transactionId")}
                        onChange={(e) => handleInputChange("internshipSpecificData", "transactionId", e.target.value)}
                        className={`w-full rounded-xl border px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white placeholder-slate-400 text-slate-800 transition-all ${
                          errors.transactionId && touched.transactionId ? "border-rose-500 bg-rose-50/20" : "border-slate-300"
                        }`}
                      />
                      {errors.transactionId && touched.transactionId && (
                        <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1.5">
                          <WarningIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                          {errors.transactionId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-slate-550 mb-2 uppercase tracking-wide">Payment Screenshot Receipt *</span>
                    
                    {!formState.internshipSpecificData.paymentScreenshot ? (
                      <div
                        ref={dragRefScreenshot}
                        onClick={() => document.getElementById('screenshot-input')?.click()}
                        onDragOver={(e) => {
                          e.preventDefault();
                          dragRefScreenshot.current?.classList.add("border-blue-500", "bg-blue-50/30");
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          dragRefScreenshot.current?.classList.remove("border-blue-500", "bg-blue-50/30");
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          dragRefScreenshot.current?.classList.remove("border-blue-500", "bg-blue-50/30");
                          const file = e.dataTransfer.files?.[0];
                          if (file) processFile(file, "screenshot");
                        }}
                        className={`border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center cursor-pointer hover:bg-slate-50/50 hover:border-blue-400 transition-all ${
                          errors.paymentScreenshot ? "border-rose-450 bg-rose-50/10" : ""
                        }`}
                      >
                        <input
                          id="screenshot-input"
                          name="paymentScreenshot"
                          type="file"
                          accept="image/jpeg,image/png,image/webp,application/pdf"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) processFile(e.target.files[0], "screenshot");
                          }}
                        />
                        <div className="flex flex-col items-center gap-2 pointer-events-none">
                          <div className="p-3 bg-white shadow-sm rounded-full">
                            <UploadIcon className="h-6 w-6 text-blue-600" />
                          </div>
                          <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                          <p className="text-xs text-slate-400">JPEG, PNG, WEBP, PDF up to 5MB</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl mt-2">
                        <div className="flex items-center gap-3">
                          <DocumentIcon className="h-6 w-6 text-emerald-600" />
                          <div>
                            <p className="text-sm font-semibold text-emerald-900 line-clamp-1">{formState.internshipSpecificData.paymentScreenshot.name}</p>
                            <p className="text-xs text-emerald-600">{(formState.internshipSpecificData.paymentScreenshot.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile("screenshot")}
                          className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                          title="Remove file"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    )}
                    {errors.paymentScreenshot && touched.paymentScreenshot && (
                      <p className="text-xs text-rose-500 font-semibold mt-2 flex items-center gap-1.5">
                        <WarningIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                        {errors.paymentScreenshot}
                      </p>
                    )}
                  </div>"""
                  
content = content.replace(old_paid_code, "                  {/* Transaction details are now captured via Payment Gateway during submit */} ")

with open(file_path, "w") as f:
    f.write(content)
print("Patch UI 2 done")
