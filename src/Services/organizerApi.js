import { organizerAxiosInstance } from "../axios/instance";

export const organizerSignup = (values) => {
  return organizerAxiosInstance.post("/signup", values);
};

export const organizerSignin = (values) => {
  return organizerAxiosInstance.post("/signin", values);
};
export const organizerAuth = () => {
  return organizerAxiosInstance.get("/isOrganizerAuth");
};

export const viewEvents = () => {
  return organizerAxiosInstance.get("/viewEvents");
};
export const organizerProfile = () => {
  return organizerAxiosInstance.get("/profile");
};
export const updateProfile = (values) => {
  return organizerAxiosInstance.post("/updateProfile", values);
};
export const bookedClients = (activePage, searchQuery) => {
  return organizerAxiosInstance.get("/booked-clients", {
    params: { activePage, searchQuery },
  });
};
export const updatePayment = (id) => {
  return organizerAxiosInstance.put("/update-payment", { id });
};
export const getOrganizerConnection = () => {
  return organizerAxiosInstance.get("/getOrganizerConnection");
};
export const OrganizersendMessage = (message) => {
  return organizerAxiosInstance.post("/organizer-sendMessage", message);
};
export const OrganizergetMessages = (id) => {
  console.log(id, "indo");
  return organizerAxiosInstance.get(`/organizer-getMessages/${id}`);
};
export const loadDashboard =()=>{
  return organizerAxiosInstance.get('/load-dashboard')
}