import React, { useState, useEffect, ReactElement } from "react";
import { useTranslations } from "next-intl";
import { ChevronRight, ChevronLeft } from "@/libs/icons";

export interface StepComponentProps {
  onValidityChange: (isValid: boolean) => void;
  onDataChange: (data: any) => void;
  data: any;
}

type StepperProps = {
  children: ReactElement[];
  onComplete: (data: any) => void;
};

export default function Stepper({ children, onComplete }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isStepValid, setIsStepValid] = useState(false);
  const [formData, setFormData] = useState<any[]>(
    new Array(children.length).fill({}),
  );

  const t = useTranslations("common");

  const handleNext = () => {
    if (currentStep < children.length - 1) {
      setCurrentStep(currentStep + 1);
      setIsStepValid(false);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setIsStepValid(true);
    }
  };

  const handleValidityChange = (isValid: boolean) => {
    setIsStepValid(isValid);
  };

  const handleDataChange = (stepData: any) => {
    setFormData((prevData) => {
      const newData = [...prevData];
      newData[currentStep] = stepData;
      return newData;
    });
  };

  const currentChild = React.cloneElement(children[currentStep], {
    onValidityChange: handleValidityChange,
    onDataChange: handleDataChange,
    data: formData[currentStep],
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-10/12">{currentChild}</div>
      <div className="flex w-10/12 flex-wrap justify-between p-4">
        {currentStep > 0 && (
          <button
            className="btn-primary mt-1 w-full lg:mt-0 lg:w-4/12"
            onClick={handlePrevious}
          >
            <ChevronLeft className="inline" size={20} /> {t("back")}
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={!isStepValid}
          className="btn-primary mt-1 w-full lg:mt-0 lg:w-4/12"
        >
          {currentStep === children.length - 1 ? t("submit") : t("next")}{" "}
          <ChevronRight
            className={`inline transition-transform duration-300 ${isStepValid ? "back-forth-animation" : ""}`}
            size={20}
          />
        </button>
      </div>
    </div>
  );
}
