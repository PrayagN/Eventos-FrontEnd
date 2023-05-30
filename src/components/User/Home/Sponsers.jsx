import { Carousel } from "@material-tailwind/react";
 
export default function Sponsors() {
  return (
    <div className=" mt-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  grid justify-items-center gap-0">
      <img
        src="https://images-platform.99static.com//a3N_EX1bu4ZYoZuNon2wOpuF9hw=/413x0:2894x2481/fit-in/500x500/projects-files/109/10974/1097485/6d2b78b0-8b08-4741-8a4c-33f11210aaab.png"
        alt="image 1"
        className="h-40 w-40 "
      />
      <img
        src="https://images-platform.99static.com//kQMqXj8_bpTzSRE2UhoWb_cGzzU=/606x164:1145x703/fit-in/500x500/99designs-contests-attachments/88/88795/attachment_88795146"
        alt="image 2"
        className="h-40 w-40 "
      />
      <img
        src="https://images-workbench.99static.com/PxmvHwtrmr9MObhozci9vOIIaRw=/http://s3.amazonaws.com/projects-files/18/1809/180901/ae82e701-1d37-ff1f-2c71-183bd4fab915.png"
        alt="image 3"
        className="h-40 w-40 object-cover"
      />
    </div>
  );
}