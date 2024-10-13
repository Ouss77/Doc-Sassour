import Header from "../Components/Header";
import doc from '../assets/doc.jpg';

function Contact() {
  return (
<div className="relative min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${doc})` }}>
  <Header />
  <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
    <div className="block rounded-lg bg-white shadow-md dark:bg-neutral-700 sm:flex sm:flex-col sm:justify-center w-full max-w-4xl">
      <div className="flex flex-wrap lg:flex-nowrap items-center lg:w-full">
        <div className="w-full lg:w-full h-64 lg:h-[500px] lg:ml-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3298.922002011692!2d-3.351192024815391!3d34.22500990858882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd9d939bd392b337%3A0x326de3acece0e334!2sCabinet%20docteur%20SASSOUR%20Mohammed!5e0!3m2!1sen!2sma!4v1712001143561!5m2!1sen!2sma"
            className="w-full h-full rounded-t-lg lg:rounded-bl-lg lg:rounded-tr-none"
            allowFullScreen
            title="Google Maps"
          ></iframe>
        </div>
        <div className="w-full lg:max-w-4xl h-full">
                <div className="p-6 lg:p-16">
                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="mb-2 font-bold dark:text-white">Prendre un rendez vous</p>
                        <p className="text-neutral-500 dark:text-neutral-200">+212661255857</p>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="mb-2 font-bold dark:text-white">Consultation en ligne</p>
                        <p className="text-neutral-500 dark:text-neutral-200">mohammedsassour@gmail.com</p>
                        <p className="text-neutral-500 dark:text-neutral-200">+212661255659</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start">
                      <div className="shrink-0">
                        <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            className="h-6 w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 007.383 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152 6.06M12 12.75c-2.883 0-5.647.508-8.208 1.44.125 2.104.52 4.136 1.153 6.06M12 12.75a2.25 2.25 0 002.248-2.354M12 12.75a2.25 2.25 0 01-2.248-2.354M12 8.25c.995 0 1.971-.08 2.922-.236.403-.066.74-.358.795-.762a3.778 3.778 0 00-.399-2.25M12 8.25c-.995 0-1.97-.08-2.922-.236-.402-.066-.74-.358-.795-.762a3.734 3.734 0 01.4-2.253M12 8.25a2.25 2.25 0 00-2.248 2.146M12 8.25a2.25 2.25 0 012.248 2.146M8.683 5a6.032 6.032 0 01-1.155-1.002c.07-.63.27-1.222.574-1.747m.581 2.749A3.75 3.75 0 0115.318 5m0 0c.427-.283.815-.62 1.155-.999a4.471 4.471 0 00-.575-1.752M4.921 6a24.048 24.048 0 00-.392 3.314c1.668.546 3.416.914 5.223 1.082M19.08 6c.205 1.08.337 2.187.392 3.314a23.882 23.882 0 01-5.223 1.082"
                            />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="mb-2 font-bold dark:text-white">Adress</p>
                        <p className="text-neutral-500 dark:text-neutral-200">Adress: angle bd Mohamed V et rue Ibn Batouta, étage 1 n°2, Guercif</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>    
        </div>
      </div>    
  );
}

export default Contact;
