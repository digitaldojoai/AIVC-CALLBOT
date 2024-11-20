import React from "react";
import { Button, Dialog, TextField } from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";
import { useState } from "react";
import { toast } from "sonner";

const Cta = () => {
  const URL = "https://api.creatorspace.la/v1/hollo-contacts";
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      business: "",
      message: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      business: yup.string().required("Business is required"),
      message: yup.string().required("Message is required"),
    }),
    onSubmit: async (values) => {
      const taoastId = toast.loading("Loading...");
      try {
        const response = await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (response.ok) {
          toast.dismiss(taoastId);
          toast.success("Message sent successfully");
          formik.resetForm();
          setOpen(false);
        } else {
          toast.dismiss(taoastId);
          toast.error("Failed to send message");
        }
      } catch (error) {
        toast.dismiss(taoastId);
        toast.error("Failed to send message");
      }
    },
  });

  const currentWindowSize = window.innerWidth;

  return (
    <section id="cta-section ">
      <Dialog open={open} fullWidth onClose={() => setOpen(false)}>
        <form
          onSubmit={formik.handleSubmit}
          className="p-4 flex flex-col gap-4"
        >
          <p className="text-2xl font-semibold">Contact Us</p>
          <div className="space-y-2">
            <p className="font-semibold text-lg">
              Name <span className="text-red-600">*</span>
            </p>
            <TextField
              label="Name"
              size={currentWindowSize < 768 ? "small" : "medium"}
              className="w-full"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1 max-sm:text-xs">
                {formik.errors.name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-lg">
              Email <span className="text-red-600">*</span>
            </p>
            <TextField
              label="Email"
              size={currentWindowSize < 768 ? "small" : "medium"}
              className="w-full"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1 max-sm:text-xs">
                {formik.errors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-lg">
              Business <span className="text-red-600">*</span>
            </p>
            <TextField
              label="Business"
              className="w-full"
              size={currentWindowSize < 768 ? "small" : "medium"}
              name="business"
              value={formik.values.business}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.business && Boolean(formik.errors.business)}
            />
            {formik.touched.business && formik.errors.business && (
              <p className="text-red-500 text-sm mt-1 max-sm:text-xs">
                {formik.errors.business}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-lg">
              Message <span className="text-red-600">*</span>
            </p>
            <TextField
              label="Message"
              className="w-full"
              size={currentWindowSize < 768 ? "small" : "medium"}
              multiline
              rows={7}
              name="message"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-red-500 text-sm mt-1 max-sm:text-xs">
                {formik.errors.message}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "black",
                borderRadius: 9999999999999,
              }}
              size={currentWindowSize < 768 ? "medium" : "large"}
            >
              Send Your Message
            </Button>
          </div>
        </form>
      </Dialog>

      <div className="global-container">
        <div className="rounded-[10px] bg-colorGreen px-5 py-[60px] md:py-20 xl:py-[100px]">
          <div className="jos mx-auto max-w-[500px] text-center lg:max-w-2xl xl:max-w-[840px]">
            <h2 className="font-spaceGrotesk text-4xl font-medium leading-[1.06] -tracking-[2px] text-black sm:text-[44px] lg:text-[56px] xl:text-[70px]">
              Start connecting now! If you need any help or assistance, feel
              free to contact our team!
            </h2>
          </div>
          <div
            className="jos mt-8 flex flex-wrap justify-center gap-6 md:mt-[50px]"
            data-jos_animation="fade"
          >
            <button
              onClick={() => setOpen(true)}
              rel="noopener noreferrer"
              className="button inline-block h-full rounded border-2 border-transparent bg-black py-3 text-base text-colorGreen after:border-colorGreen after:bg-colorGreen hover:text-black"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
