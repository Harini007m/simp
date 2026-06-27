import re

file_path = "/Users/test/Documents/simp/frontend/app/apply/page.tsx"
with open(file_path, "r") as f:
    content = f.read()

# Add Photo Upload to Step 1
photo_ui = """                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-550 mb-2 uppercase tracking-wide">Passport Size Photo *</label>
                  <p className="text-xs text-slate-400 mb-3">Please upload a clear passport-sized photograph. Accepted formats: JPG, PNG, WEBP (Max 5MB)</p>
                  
                  {formState.personalInformation.photo ? (
                    <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <DocumentIcon className="h-6 w-6 text-emerald-600" />
                        <div>
                          <p className="text-sm font-semibold text-emerald-900">{formState.personalInformation.photo.name}</p>
                          <p className="text-xs text-emerald-600">{(formState.personalInformation.photo.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile("photo")}
                        className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors"
                        title="Remove photo"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                      </button>
                    </div>
                  ) : (
                    <div
                      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        errors.photo ? "border-rose-300 bg-rose-50/50" : "border-slate-300 hover:border-blue-400 hover:bg-blue-50/50 bg-slate-50"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            processFile(e.target.files[0], "photo");
                          }
                        }}
                      />
                      <div className="flex flex-col items-center gap-2 pointer-events-none">
                        <div className="p-3 bg-white shadow-sm rounded-full">
                          <UploadIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400">JPG, PNG, WEBP up to 5MB</p>
                      </div>
                    </div>
                  )}
                  {errors.photo && touched.photo && (
                    <p className="text-xs text-rose-500 font-semibold mt-1.5 flex items-center gap-1.5">
                      <WarningIcon className="h-3.5 w-3.5 text-rose-500 shrink-0" />
                      {errors.photo}
                    </p>
                  )}
                </div>

              </div>
            </div>"""
            
step_1_end_search = "              </div>\n            </div>\n\n            {/* Step 2: Academic Information */}"
content = content.replace(step_1_end_search, photo_ui + "\n\n            {/* Step 2: Academic Information */}")

with open(file_path, "w") as f:
    f.write(content)
print("Patch UI 1 done")
