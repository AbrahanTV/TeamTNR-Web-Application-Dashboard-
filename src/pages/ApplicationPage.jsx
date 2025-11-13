import ApplicationForm from "../components/ApplicationForm";

const ApplicationPage = () => {
  return (
    <>
      <div className="container d-flex flex-column align-items-center my-5 text-center gap-3">
        <h1>TeamTNR, LLC Adoption Form</h1>
        <p className="col-md-8">
          Thank you for your interest in adopting through Team TNR, LLC. Our
          goal is to ensure that every cat is placed in a loving, responsible,
          and permanent home. Please complete this application thoroughly and
          honestly-your answers help us make the best match for both you and
          your new pet.
        </p>
      </div>
      <ApplicationForm />
    </>
  );
};

export default ApplicationPage;
