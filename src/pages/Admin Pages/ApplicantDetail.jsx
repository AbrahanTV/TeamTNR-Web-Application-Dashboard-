import { useParams, useNavigate } from "react-router-dom";
import {
  DUMMY_APPLICANTS,
  DUMMY_HOUSEHOLDS,
  DUMMY_RESIDENTS,
  DUMMY_PETS,
  DUMMY_CURRENT_PETS,
  DUMMY_LIFESTYLE,
  DUMMY_REFERENCES,
  DUMMY_AGREEMENTS,
} from "/src/data/dummyData.js";
import "/src/styles/applicant-detail.css";

const ApplicantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const applicant = DUMMY_APPLICANTS.find((a) => a.id == id);

  if (!applicant) {
    return (
      <div className="detail-error">
        <h2>⚠️ Applicant not found</h2>
        <button onClick={() => navigate("/admin")} className="back-btn">
          Back to Dashboard
        </button>
      </div>
    );
  }

  const household = DUMMY_HOUSEHOLDS.find((h) => h.applicantId == id) || null;
  const residents = household
    ? DUMMY_RESIDENTS.filter((r) => r.householdId == household.id)
    : [];
  const pet = household
    ? DUMMY_PETS.find((p) => p.householdId == household.id) || null
    : null;
  const currentPets = household
    ? DUMMY_CURRENT_PETS.filter((p) => p.householdId == household.id)
    : [];
  const lifestyle = household
    ? DUMMY_LIFESTYLE.find((l) => l.householdId == household.id) || null
    : null;
  const references = household
    ? DUMMY_REFERENCES.filter((r) => r.householdId == household.id)
    : [];
  const agreement = DUMMY_AGREEMENTS.find((a) => a.applicantId == id) || null;

  return (
    <div className="applicant-detail-container">
      <div className="detail-header">
        <button
          onClick={() => navigate("/admin/applicants")}
          className="back-btn-small"
        >
          ← Back
        </button>
        <div className="header-title">
          <h1>
            {applicant.firstName} {applicant.lastName}
          </h1>
          <p>Applicant ID: {applicant.id}</p>
        </div>
      </div>

      <div className="detail-grid">
        <div className="detail-card applicant-main">
          <div className="card-header-detail">
            <h2>📋 Personal Information</h2>
            <span className="status-badge">Active</span>
          </div>
          <div className="detail-content">
            <div className="detail-row">
              <div className="detail-field">
                <label>Full Name</label>
                <p>
                  {applicant.firstName} {applicant.lastName}
                </p>
              </div>
              <div className="detail-field">
                <label>Applicant ID</label>
                <p>{applicant.id}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label>Date of Birth</label>
                <p>{applicant.dob}</p>
              </div>
              <div className="detail-field">
                <label>Preferred Contact</label>
                <p className="text-capitalize">{applicant.preferredContact}</p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-field">
                <label>Phone</label>
                <p>
                  <a href={`tel:${applicant.phoneNumber}`} className="link">
                    {applicant.phoneNumber}
                  </a>
                </p>
              </div>
              <div className="detail-field">
                <label>Email</label>
                <p>
                  <a href={`mailto:${applicant.email}`} className="link">
                    {applicant.email || "N/A"}
                  </a>
                </p>
              </div>
            </div>

            <div className="detail-row">
              <div className="detail-field full-width">
                <label>Submission Date</label>
                <p>{applicant.dateOfSubmission}</p>
              </div>
            </div>
          </div>
        </div>

        {household ? (
          <div className="detail-card household-card">
            <div className="card-header-detail">
              <h2>🏠 Household Information</h2>
            </div>
            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Address</label>
                  <p>
                    {applicant.street}, {applicant.city}, {applicant.state}{" "}
                    {applicant.zipCode}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Rent or Own</label>
                  <p className="text-capitalize">
                    {household.rentOwn || "N/A"}
                  </p>
                </div>
              </div>
              <div className="detail-row">
                <div className="detail-field">
                  <label>Type of Residence</label>
                  <p className="text-capitalize">
                    {household.residenceType || "N/A"}
                  </p>
                </div>
                <div className="detail-field">
                  <label>Pets Allowed</label>
                  <p>{household.petsAllowed ? "Yes" : "No"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Months at Address</label>
                  <p>{household.monthsAtAddress || "N/A"}</p>
                </div>
              </div>

              <div className="card-header-detail">
                <h2>👤 Household Members ({residents.length})</h2>
              </div>

              {residents.length > 0 ? (
                <div className="residents-list">
                  {residents.map((resident, index) => (
                    <div key={index} className="resident-item">
                      <div className="detail-row">
                        <div className="detail-field">
                          <label>Name</label>
                          <p>{resident.memberName || "N/A"}</p>
                        </div>
                        <div className="detail-field">
                          <label>Age</label>
                          <p>{resident.age || "N/A"}</p>
                        </div>
                      </div>

                      <div className="detail-row">
                        <div className="detail-field">
                          <label>Relationship</label>
                          <p className="text-capitalize">
                            {resident.relationship || "N/A"}
                          </p>
                        </div>
                        <div className="detail-field">
                          <label>Cat Allergies</label>
                          <p>{resident.catAllergies ? "Yes" : "No"}</p>
                        </div>
                      </div>
                      {index < residents.length - 1 && <hr />}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No resident information available</p>
              )}
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No household information available</p>
          </div>
        )}

        {pet ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>🐱 Pet History</h2>
            </div>

            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Current Pets</label>
                  <p>{pet.hasCurrentPets ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Previous Pets</label>
                  <p>{pet.previousPets || "None"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Vet Name</label>
                  <p>{pet.vetName || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Vet Phone</label>
                  <p>{pet.vetPhone || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Contact Vet?</label>
                  <p>{pet.contactVet ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Preference</label>
                  <p>{pet.noPreference ? "No preference" : "Prefers"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Cat Age Preference</label>
                  <p>{pet.preferenceAge || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Gender Preference</label>
                  <p>{pet.preferenceGender || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Personality Traits</label>
                  <p>{pet.personalityTraits || "N/A"}</p>
                </div>
                <div className="detail-field">
                  <label>Why Adopt?</label>
                  <p>{pet.whyAdopt || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Living Environment</label>
                  <p>{pet.catLivingArrangement ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Stays When Away?</label>
                  <p>{pet.catStayWhenAway || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Hours Alone</label>
                  <p>{pet.hoursAlone}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No pet information available</p>
          </div>
        )}

        {currentPets.length > 0 ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>🐾 Current Pets ({currentPets.length})</h2>
            </div>

            <div className="detail-content">
              {currentPets.map((pet, index) => (
                <div key={index} className="pet-item">
                  <div className="detail-row">
                    <div className="detail-field">
                      <label>Breed</label>
                      <p>{pet.petBreed}</p>
                    </div>
                    <div className="detail-field">
                      <label>Age</label>
                      <p>{pet.petAge}</p>
                    </div>
                  </div>

                  <div className="detail-row">
                    <div className="detail-field">
                      <label>Status</label>
                      <p className="text-capitalize">{pet.petStatus}</p>
                    </div>
                    <div className="detail-field">
                      <label>Vaccinated</label>
                      <p>{pet.petVaccinated ? "Yes" : "No"}</p>
                    </div>
                  </div>

                  {index < currentPets.length - 1 && <hr />}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No current pets information available</p>
          </div>
        )}

        {lifestyle ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>Lifestyle</h2>
            </div>

            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Will declaw</label>
                  <p>{lifestyle.declaw ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Move plan</label>
                  <p>{lifestyle.movePlan}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field">
                  <label>Financially Stable</label>
                  <p>{lifestyle.financiallyStable ? "Yes" : "No"}</p>
                </div>
                <div className="detail-field">
                  <label>Cat Care</label>
                  <p>{lifestyle.catCare}</p>
                </div>
              </div>

              {references.length > 0 && (
                <>
                  <div className="card-header-detail">
                    <h2>📞 References ({references.length})</h2>
                  </div>
                  <div className="references-list">
                    {references.map((reference, index) => (
                      <div key={index} className="reference-item">
                        <div className="detail-row">
                          <div className="detail-field">
                            <label>Name</label>
                            <p>{reference.referenceName || "N/A"}</p>
                          </div>
                          <div className="detail-field">
                            <label>Phone</label>
                            <p>
                              {reference.referencePhone ? (
                                <a
                                  href={`tel:${reference.referencePhone}`}
                                  className="link"
                                >
                                  {reference.referencePhone}
                                </a>
                              ) : (
                                "N/A"
                              )}
                            </p>
                          </div>
                        </div>
                        {index < references.length - 1 && <hr />}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No lifestyle information available</p>
          </div>
        )}

        {agreement ? (
          <div className="detail-card resident-card">
            <div className="card-header-detail">
              <h2>📝 Agreement</h2>
            </div>

            <div className="detail-content">
              <div className="detail-row">
                <div className="detail-field">
                  <label>Agreement Status</label>
                  <p>{agreement.agreed ? "Agreed" : "Not Agreed"}</p>
                </div>
                <div className="detail-field">
                  <label>Signature</label>
                  <p>{agreement.signature || "N/A"}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-field full-width">
                  <label>Signed Date</label>
                  <p>
                    {agreement.signedDate
                      ? new Date(agreement.signedDate).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="detail-card empty-state">
            <p>No agreement information available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDetail;
