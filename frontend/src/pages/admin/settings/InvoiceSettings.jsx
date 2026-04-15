import { useState } from "react";

export default function InvoiceSettings() {
  const [settings, setSettings] = useState({
    currency: "USD",
    taxRate: 10,
    invoicePrefix: "INV",
    autoGenerate: true,
    sendEmailCopy: true,
    paymentTerms: 30
  });

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Saved invoice settings:", settings);
    alert("Invoice settings saved!");
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Invoice Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Manage payment and billing preferences</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
            <select
              name="currency"
              value={settings.currency}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tax Rate (%)</label>
            <input
              type="number"
              name="taxRate"
              value={settings.taxRate}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Prefix</label>
            <input
              type="text"
              name="invoicePrefix"
              value={settings.invoicePrefix}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms (days)</label>
            <input
              type="number"
              name="paymentTerms"
              value={settings.paymentTerms}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-3 pt-3">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="autoGenerate"
              checked={settings.autoGenerate}
              onChange={(e) => setSettings({ ...settings, autoGenerate: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">Auto-generate invoices for appointments</span>
          </label>
          
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="sendEmailCopy"
              checked={settings.sendEmailCopy}
              onChange={(e) => setSettings({ ...settings, sendEmailCopy: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm text-gray-700">Send email copy to patient</span>
          </label>
        </div>

        <div className="pt-4">
          <button onClick={handleSave} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}