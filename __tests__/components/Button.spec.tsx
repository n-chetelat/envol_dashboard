import { render, screen } from "@testing-library/react";
import Button from "@/components/buttons/Button";

// Adjust the import path as necessary
jest.mock("next-intl", () => ({
  useTranslations: jest
    .fn()
    .mockReturnValue(jest.fn(() => (key: string) => key)),
}));
jest.mock("@/libs/icons", () => ({
  Loader: jest.fn(({ className }: { className: string }) => (
    <div data-testid="loader" className={className} />
  )),
}));
describe("Button Component", () => {
  it("renders with type submit when type attribute is submit", () => {
    render(
      <Button isSubmitting={false} type="submit">
        Submit
      </Button>,
    );
    const buttonElement = screen.getByRole("button", { name: /submit/i });
    expect(buttonElement).toHaveAttribute("type", "submit");
  });
  it("renders with type button when type attribute is button", () => {
    render(
      <Button isSubmitting={false} type="button">
        Click Me
      </Button>,
    );
    const buttonElement = screen.getByRole("button", { name: /click me/i });
    expect(buttonElement).toHaveAttribute("type", "button");
  });
  it("renders Loader when isSubmitting is true", () => {
    render(<Button isSubmitting={true}>Submit</Button>);
    const loaderElement = screen.getByTestId("loader");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass("mr-2 h-5 w-5 animate-spin");
  });
  it("does not render Loader when isSubmitting is false", () => {
    render(<Button isSubmitting={false}>Submit</Button>);
    const loaderElement = screen.queryByTestId("loader");
    expect(loaderElement).not.toBeInTheDocument();
  });
});
