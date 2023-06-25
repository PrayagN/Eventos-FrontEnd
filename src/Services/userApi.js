import { userAxiosInstance } from "../axios/instance";

export const userSignin = (values) => {
  return userAxiosInstance.post("/signin", values);
};
export const userSignup = (values) => {
  return userAxiosInstance.post("/signup", values);
};
export const userAuth = () => {
  return userAxiosInstance.get("/isUserAuth");
};
export const eventList = () => {
  return userAxiosInstance.get("/listEvent");
};
export const eventOrganizers = (
  id,
  activePage,
  searchQuery,
  organizerLimitPerPage
) => {
  return userAxiosInstance.post("/eventOrganizers", {
    id,
    activePage,
    searchQuery,
    organizerLimitPerPage,
  });
};
export const organizerList = (activePage, organizerLimitPerPage, searchQuery, selectedEvent) => {
  return userAxiosInstance.get("/listOrganizers", {
    params: { activePage, organizerLimitPerPage, searchQuery, selectedEvent },
  });
};
export const organizerView = (id) => {
  return userAxiosInstance.post("/viewOrganizer", { id });
};
export const profileGet = () => {
  return userAxiosInstance.get("/profile");
};
export const updateProfile = (values) => {
  return userAxiosInstance.put("/updateProfile", values);
};
export const checkoutPayment = (values) => {
  return userAxiosInstance.post("/create-checkout-session", values);
};
export const bookedEvents = () => {
  return userAxiosInstance.get("/booked-events");
};
export const reviewOrganizer = (id,rating,review) => {
  return userAxiosInstance.post('/review-organizer',{id,rating,review});
};
export const cancelBooking = (id)=>{
  return userAxiosInstance.post('/cancel-booking',{id})
}
export const chatbot =(message)=>{
  return userAxiosInstance.post('/chatbot',message)
}
