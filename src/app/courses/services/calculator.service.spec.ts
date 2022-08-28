import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe("CalculatorService", () => {
  // let calculatorService: CalculatorService;
  // let loggerSpy: any;
  //
  // beforeEach(() => {
  //   loggerSpy = jasmine.createSpyObj("LoggerService", ["log"]);
  // });

  it("should add two numbers", () => {
    const logger = jasmine.createSpyObj("LoggerService", ["log"]);
    const calculatorService = new CalculatorService(logger);
    const result = calculatorService.add(2, 2);

    expect(result).toBe(4, "expected result");
    expect(logger.log).toHaveBeenCalledTimes(1);
  });

  it("should subtract two numbers", () => {
    const logger = new LoggerService();
    const calculatorService = new CalculatorService(logger);
    const result = calculatorService.subtract(2, 2);
    expect(result).toBe(0);
  });
});
