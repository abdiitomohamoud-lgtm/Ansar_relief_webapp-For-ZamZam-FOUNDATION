import React from "react";
import { FaEnvelope, FaPlus } from "react-icons/fa";
import FeedbackState from "./FeedbackState";

const ContactTab = ({ contactForms, loadingContacts, errorContacts }) => (
  <div>
    <div className="flex items-center justify-between mb-6">
      <div className="text-lg font-semibold text-green-700 flex items-center gap-2">
        <FaEnvelope className="text-green-500" /> Contact Forms
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-green-700 rounded-lg shadow transition font-medium border border-green-200" onClick={() => {/* TODO: Clear contact forms */}}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          Clear
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow transition font-medium" onClick={() => {/* TODO: Add contact form */}}>
          <FaPlus /> Create New Contact
        </button>
      </div>
    </div>
    <div className="mb-4 text-gray-600 text-sm">{contactForms.length} forms submitted</div>
    <FeedbackState loading={loadingContacts} error={errorContacts} empty={!loadingContacts && !errorContacts && contactForms.length === 0} emptyMsg="No contact forms submitted yet." />
    {(!loadingContacts && !errorContacts && contactForms.length > 0) ? (
      <div className="space-y-8">
        {contactForms.map((form) => (
          <div key={form.id} className="border border-green-100 rounded-lg p-6 bg-gray-50 shadow-sm relative group transition-all duration-200 hover:shadow-lg">
            <div className="absolute top-4 right-4 flex gap-2 opacity-80 group-hover:opacity-100 transition-all">
              <button className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 shadow" title="Delete" onClick={() => {/* TODO: Delete contact form */}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-600 shadow" title="Resend" onClick={() => {/* TODO: Resend contact form */}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581M19.418 15A7.974 7.974 0 0012 8c-1.657 0-3.22.403-4.575 1.125M4.582 9A7.974 7.974 0 0012 16c1.657 0 3.22-.403 4.575-1.125" /></svg>
              </button>
            </div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-xs text-gray-500"><FaEnvelope className="inline mr-1 text-green-400" />{form.date}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Full Name</label>
                <input disabled value={form.fullName} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Your Name</label>
                <input disabled value={form.yourName} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Email</label>
                <input disabled value={form.email} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Phone Number</label>
                <input disabled value={form.phoneNumber} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Gender</label>
                <input disabled value={form.gender} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Subject</label>
                <input disabled value={form.subject} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Organization (optional)</label>
                <input disabled value={form.organization} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Address</label>
                <input disabled value={form.address} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">City</label>
                <input disabled value={form.city} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Country</label>
                <input disabled value={form.country} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Message</label>
                <textarea disabled value={form.message} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium resize-none" rows={2} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">Additional Information</label>
                <textarea disabled value={form.additionalInfo} className="w-full border-0 border-b-2 border-green-300 bg-transparent focus:outline-none text-gray-700 font-medium resize-none" rows={2} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export default ContactTab;
