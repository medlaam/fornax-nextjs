import { useForm } from 'react-hook-form';
import axios from 'axios';
import { contactType } from '../../config/contactFormType';
import Head from 'next/head';
import styles from '../../styles/contact.module.css';


const Contact = () => {
  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmitForm(values) {
    let config = {
      method: 'post',
      url: `http://localhost:3000/api/contact` || `https://liberte-blogs.vercel.app/contact`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    try {
      const response = await axios(config);
      console.log(response);
      if (response.status == 200) {
        reset();

      }
    } catch (err) { }
    console.log(values);
  }

  return (
    <>
      <Head>
        <title>Contact</title>
      </Head>
      <div className={`b py-16 px-4 sm:px-6 h-screen flex justify-center items-center ${styles.contact}`}>
        <div className="mx-auto w-full max-w-2xl rounded-xl p-8 ">
          {
            contactType.type === 'nodemailer' &&
            <form
              onSubmit={handleSubmit(onSubmitForm)}
              className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'You must enter your name',
                    },
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors ? 'ring-2 ring-red-500' : null
                    }`}
                  placeholder="Full name"
                />
                <span className="text-red-400 text-sm py-2">
                  {errors?.name?.message}
                </span>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  type="text"
                  {...register('email', {
                    required: {
                      value: true,
                      message: 'You must enter your email address',
                    },
                    minLength: {
                      value: 8,
                      message: 'This is not long enough to be an email',
                    },
                    maxLength: {
                      value: 120,
                      message: 'This is too long',
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'This needs to be a valid email address',
                    },
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors ? 'ring-2 ring-red-500' : null
                    }`}
                  placeholder="Email"
                />
                <span className="text-red-400 text-sm py-2">
                  {errors?.email?.message}
                </span>
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  type="text"
                  {...register('phone')}
                  className="block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  rows="4"
                  {...register('message', {
                    required: {
                      value: true,
                      message: 'You need to enter your message',
                    },
                    maxLength: {
                      value: 1000,
                      message: "Your message can't be more than 1000 characters",
                    },
                    minLength: {
                      value: 20,
                      message: 'Your message must be longer than this!',
                    },
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors ? 'ring-2 ring-red-500' : null
                    }`}
                  placeholder="Message"></textarea>
                <span className="text-red-400 text-sm py-2">
                  {errors?.message?.message}
                </span>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Submit
                </button>
              </div>
            </form>
          }

          {
            contactType.type === 'airForm' &&
            <form
              action="https://airform.io/rakibur74@gmail.com" method="post"
              className="grid grid-cols-1 gap-y-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Full name
                </label>
                <input
                  type="text"
                  {...register('name', {
                    required: {
                      value: true,
                      message: 'You must enter your name',
                    },
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors ? 'ring-2 ring-red-500' : null
                    }`}
                  placeholder="Full name"
                />
                <span className="text-red-400 text-sm py-2">
                  {errors?.name?.message}
                </span>
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <span className="text-red-400 text-sm py-2">
                  {errors?.email?.message}
                </span>
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  rows="4"
                  {...register('message', {
                    required: {
                      value: true,
                      message: 'You need to enter your message',
                    },
                    maxLength: {
                      value: 1000,
                      message: "Your message can't be more than 1000 characters",
                    },
                    minLength: {
                      value: 10,
                      message: 'Your message must be longer than this!',
                    },
                  })}
                  className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors ? 'ring-2 ring-red-500' : null
                    }`}
                  placeholder="Message"></textarea>
                <span className="text-red-400 text-sm py-2">
                  {errors?.message?.message}
                </span>
              </div>
              <div>
                <button
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Send
                </button>
              </div>
            </form>
          }

          {/* <button onClick={handleClick}>Toggle</button> */}
        </div>
      </div>
    </>
  );
};

export default Contact;