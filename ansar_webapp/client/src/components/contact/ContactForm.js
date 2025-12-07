import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion } from 'framer-motion';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  subject: yup.string().required('Subject is required'),
  message: yup.string().required('Message is required'),
});

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    // TODO: send to backend, show modal on success
    alert('Message sent!');
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
      <input {...register('name')} placeholder="Name" className="input w-full border rounded px-3 py-2" />
      {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      <input {...register('email')} placeholder="Email" className="input w-full border rounded px-3 py-2" />
      {errors.email && <span className="text-red-500">{errors.email.message}</span>}
      <input {...register('phone')} placeholder="Phone" className="input w-full border rounded px-3 py-2" />
      {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
      <input {...register('subject')} placeholder="Subject" className="input w-full border rounded px-3 py-2" />
      {errors.subject && <span className="text-red-500">{errors.subject.message}</span>}
      <textarea {...register('message')} placeholder="Message" className="input w-full border rounded px-3 py-2" />
      {errors.message && <span className="text-red-500">{errors.message.message}</span>}
      <button type="submit" className="btn-primary w-full bg-primary-600 text-white py-2 rounded hover:bg-primary-700 transition" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
      {isSubmitSuccessful && <div className="text-green-500 mt-2">Message sent!</div>}
    </motion.form>
  );
};

export default ContactForm;
