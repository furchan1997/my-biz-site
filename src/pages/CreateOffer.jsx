import { Formik, useFormik } from "formik";
import joi from "joi";
import { useAdmin } from "../context/adminContext";
import Input from "../components/Input";
import SelectComponent from "../components/SelectComponent";
import {
  websiteTypesMap,
  goalOfProject,
  budget,
  features,
  targetAudience,
  entriesOpt,
} from "../common/ClientOptions";
import Select from "react-select";
import { useEffect } from "react";

function CreateOffer() {
  const { error, createOffer } = useAdmin();

  const form = useFormik({
    validateOnMount: false,

    initialValues: {
      fullName: "",
      phone: "",
      websiteType: [],
      otherSiteType: "",
      goalOfProject: [],
      otherGoleProject: "",
      targetAudience: [],
      features: [],
      exampleFavoriteSite: "",
      budget: [],
    },

    validate(value) {
      const schema = joi.object({
        fullName: joi.string().min(2).max(20).required(),
        phone: joi.string().min(9).max(11).required(),
        websiteType: joi.alternatives(
          joi.string(),
          joi.array().items(joi.string())
        ),
        otherSiteType: joi.string().min(2).max(20).allow(""),
        goalOfProject: joi.alternatives(
          joi.string(),
          joi.array().items(joi.string())
        ),
        otherGoleProject: joi.string().min(2).max(20).allow(""),
        targetAudience: joi.array().items(joi.string()).min(1).required(),
        features: joi.array().items(joi.string()).min(1).required(),
        exampleFavoriteSite: joi.string().min(2).max(200).allow(""),
        budget: joi.alternatives(joi.string(), joi.array().items(joi.string())),
      });

      const { error } = schema.validate(value, { abortEarly: false });
      console.log(error);
    },

    async onSubmit(value) {
      try {
        await createOffer(value);
        console.log("טופס נשלח עם:", value);
        alert("הטופס נשלח!");
      } catch (err) {
        console.error("שגיאה בשליחה", err);
        alert("שליחה נכשלה");
      }
    },
  });

  return (
    <div id="form">
      <h2 className="p-4 fw-bold text-primary">
        טופס היכרות לקוח עבור הצעת מחיר ועבודה
      </h2>
      <form
        className="d-flex flex-column gap-3"
        onSubmit={form.handleSubmit}
        noValidate
        autoComplete="off"
      >
        {error && <div className="alert alert-danger">Error: {error}</div>}
        <Input
          lable={"שם מלא"}
          required
          inputType={"text"}
          name={"full-name"}
          id={"fullName"}
          {...form.getFieldProps("fullName")}
          error={form?.touched?.fullName && form?.errors?.["fullName"]}
        />
        <Input
          lable={"טלפון נייד"}
          required
          inputType={"text"}
          name={"phone"}
          id={"phone"}
          {...form.getFieldProps("phone")}
          error={form?.touched?.fullName && form?.errors?.["phone"]}
        />
        <SelectComponent
          label={"סוג אתר"}
          name="websiteType"
          value={form.values.websiteType}
          onChange={form.handleChange}
          option={entriesOpt(websiteTypesMap)}
        />
        <Input
          lable={"אחר, אנא פרט"}
          inputType={"text"}
          name={"otherSiteType"}
          id={"otherSiteType"}
          {...form.getFieldProps("otherSiteType")}
        />
        <SelectComponent
          label={"מטרת הפרויקט"}
          name={"goalOfProject"}
          value={form.values.goalOfProject}
          onChange={form.handleChange}
          option={entriesOpt(goalOfProject)}
        />

        <Input
          lable={"אחר, אנא פרט"}
          inputType={"text"}
          name={"otherGoleProject"}
          id={"otherGoleProject"}
          {...form.getFieldProps("otherGoleProject")}
        />
        <label className="form-label fw-bold">מי הם קהלי היעד שלך?</label>
        <Select
          classNamePrefix="react-select"
          className="border-2 border-primary mb-3"
          isMulti
          placeholder="קהלי היעד"
          onChange={(selectedOptions) => {
            const targetAudienceValue = selectedOptions.map((opt) => opt.value);
            form.setFieldValue("targetAudience", targetAudienceValue);
          }}
          value={entriesOpt(targetAudience).filter((opt) =>
            form.values.targetAudience.includes(opt.value)
          )}
          options={entriesOpt(targetAudience)}
          menuPlacement="auto" // או "top" אם אתה רוצה שהתפריט ייפתח למעלה
          maxMenuHeight={300} // מגדיל את הגובה המקסימלי של התפריט
        />
        <label className="form-label fw-bold">
          תכונות ופיצ'רים שחשובים לך?
        </label>
        <Select
          isMulti
          placeholder="תכונות ופיצ'רים חשובים"
          onChange={(selectedOptions) => {
            const featuresValue = selectedOptions.map((opt) => opt.value);
            form.setFieldValue("features", featuresValue);
          }}
          value={entriesOpt(features).filter((opt) =>
            form.values.features.includes(opt.value)
          )}
          options={entriesOpt(features)}
          menuPlacement="bottom" // או "top" אם אתה רוצה שהתפריט ייפתח למעלה
          maxMenuHeight={300} // מגדיל את הגובה המקסימלי של התפריט
        />

        <SelectComponent
          label={"מחיר משוער"}
          name={"budget"}
          value={form.values.budget}
          onChange={form.handleChange}
          option={entriesOpt(budget)}
        />

        <Input
          lable={`האם יש לך דוגמאות לאתרים או אפליקציות שאתה אוהב את העיצוב שלהם?
            `}
          inputType={"text"}
          name={"exampleFavoriteSite"}
          id={"exampleFavoriteSite"}
          {...form.getFieldProps("exampleFavoriteSite")}
        />

        <div>
          <button className="btn btn-primary w-50 " type="submit">
            שלח הצעה
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateOffer;
