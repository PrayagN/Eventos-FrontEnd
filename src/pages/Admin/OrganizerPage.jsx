import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Organizers from "../../components/Admin/organizers/Organizers";

function OrganizerPage() {
  return (
    <div className="flex justify-between">
      <Sidebar />

      <Organizers />
    </div>
  );
}

export default OrganizerPage;
