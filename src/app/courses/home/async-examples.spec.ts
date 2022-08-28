import { fakeAsync, flush, flushMicrotasks, tick } from "@angular/core/testing";
import { delay } from "rxjs/operators";
import { of } from "rxjs";

describe("Async Testing Examples", () => {
  it("Asynchronous test example with Jasmine done()", (done: DoneFn) => {
    let test = false;
    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 1000);
  });

  it("Asynchronous test example with fakeAsync Zone", fakeAsync(() => {
    let test = false;
    setTimeout(() => {
      test = true;
    }, 1000);

    // tick(1000);
    flush();
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example with plain Promise", fakeAsync(() => {
    let test = false;
    console.log("Creating promise");

    Promise.resolve()
      .then(() => {
        console.log("Promise first then() evaluated successfully");
        test = true;
        return Promise.resolve();
      })
      .then(() => {
        console.log("Promise second then() evaluated successfully");
        test = true;
      });

    flushMicrotasks();
    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));

  it("Asynchronous test example with plain Promise + setTimeout()", fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      console.log("Promise first then() evaluated successfully");
      counter += 10;
      setTimeout(() => {
        counter++;
      }, 1000);
    });

    expect(counter).toEqual(0);
    flushMicrotasks();
    expect(counter).toEqual(10);
    tick(500);
    expect(counter).toEqual(10);
    tick(500);
    expect(counter).toEqual(11);
  }));

  it("Asynchronous test example with Observables", fakeAsync(() => {
    let test = false;
    console.log("Creating observable");

    const test$ = of(test).pipe(delay(1000));
    test$.subscribe(() => {
      test = true;
    });
    tick(1000);

    console.log("Running test assertions");
    expect(test).toBeTruthy();
  }));
});
