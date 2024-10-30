import { renderHook } from "@testing-library/react";
import { FieldError } from "react-hook-form";
import { useTranslations } from "next-intl";
import useTranslatedError from "@/hooks/useTranslatedError";
import { translateError } from "@/libs/utils";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("@/libs/utils", () => ({
  translateError: jest.fn(),
}));

describe("useTranslatedError", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should translate the error correctly when field error exists", () => {
    const mockError: FieldError = {
      type: "required",
      message: "This field is required",
    };

    (translateError as jest.Mock).mockReturnValue({
      message: "This field is required",
    });

    const { result } = renderHook(() => useTranslatedError(mockError));

    expect(translateError).toHaveBeenCalledWith(
      (useTranslations as jest.Mock).mock.results[0].value,
      mockError,
    );
    expect(result.current).toEqual({ message: "This field is required" });
  });

  it("should return undefined when field error does not exist", () => {
    (translateError as jest.Mock).mockReturnValue(undefined);

    const { result } = renderHook(() => useTranslatedError(undefined));

    expect(translateError).toHaveBeenCalledWith(
      (useTranslations as jest.Mock).mock.results[0].value,
      undefined,
    );
    expect(result.current).toBeUndefined();
  });
});
