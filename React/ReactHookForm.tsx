/**
 * React Hook form is a lightweight form management library that is used to build highly performant form compponents.
 * It offers complete solutions for managing form data, state, field states, validation, error generation and third party schema integrations.
 * React Hook Form prioritizes on uncontrolled input implementation. 
 * This means, form fields are uncontrolled by default, in contrast to the React hype of controlling all input fields.
 * "Uncontrolled first" approach leads to better performance as no re-renders happen due to changes in form values.
 * Form fields can be controlled to some degree on demand and individually. This is possible because React Hook Form isolates re-renders of form fields from value updates. 
 * And hence reduces unnecessary re-renders unless demanded otherwise.
 */
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReactHookForm = () => {
  const { register, formState, handleSubmit, setError, reset, watch, control } =
    useForm({
      mode: "onChange",
      defaultValues: {
        title: "",
        subtitle: "",
        content: "",
        date: new Date(),
      },
      criteriaMode: "all",
      shouldFocusError: true,
    });

  // The entire form data object can be watched with watch() API
  //   const post = watch();
  //    console.log(post, "tracking all form fields");

  // With React Hook Form, we can watch fields individually, by passing in the field name to watch():
  //   const content = watch("content");
  //   console.log(content);

  useEffect(() => {
    console.log("effect rendering everytime form field changges");
    reset();
  }, []);
  const onSubmit = (data: any) => {
    console.log(data);
    setTimeout(() => {
      // integrate server side errors into the form errors object.
      setError("subtitle", {
        message: new Error("Server Error: Subtitle field is protected").message,
      });
    }, 2000);
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center gap-4 justify-center h-screen"
      >
        <div className="flex flex-col w-1/2">
          <label htmlFor="title">Title</label>
          <input
            {...register("title", { required: "Title should not be Empty" })}
            className="bg-slate-200 p-2 rounded-lg w-full"
            type="text"
          />
          {formState?.errors && (
            <span className="text-red-700">
              {formState.errors.title?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="subtitle">Subtitle</label>
          <input
            {...register("subtitle", {
              required: "Subtitle should not be empty",
              maxLength: {
                value: 50,
                message: "Keep Subtitle shorter",
              },
            })}
            className="bg-slate-200 p-2 rounded-lg w-full"
            type="text"
          />
          {formState?.errors && (
            <span className="text-red-700">
              {formState.errors.subtitle?.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="content">Content</label>
          <textarea
            {...register("content", {
              required: "Content should not be empty",
              minLength: {
                value: 20,
                message: "Content should have enough information",
              },
              maxLength: {
                value: 100,
                message: "Content has reached maximum limit of 100 characters",
              },
            })}
            className="bg-slate-200 p-2 rounded-lg w-full"
          />
          {formState?.errors && (
            <span className="text-red-700">
              {formState.errors.content?.message}
            </span>
          )}
        </div>
        <Controller
          name="date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field, fieldState }) => (
            <div>
              <DatePicker
                className="bg-slate-200 p-3"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                placeholderText="Select a date"
              />
              {fieldState.error && <span>{fieldState.error.message}</span>}
            </div>
          )}
        />
        <button
          disabled={!formState?.isValid}
          className="p-2 w-[100px] text-white hover:opacity-90 bg-slate-700 rounded-lg"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReactHookForm;
