/*
  USAGE:

    // DECLARE
    const measure = useRef<CachedMeassure>(new CachedMeassure(true))

    // USE
    const someMethod = useCallback(() => {
      measure.current.GetOrMessure((res: CachedMeassureResult) => {
        // use the res.
      })
    }, [])

    // AT VIEW
     <View ref={measure.current.theRef} />

*/
import { useRef } from "react";
import { IsPointInRect } from "./UtilsTS";

export type CachedMeasureResult = {
  x: number,
  y: number,
  width: number,
  height: number,
  px: number,
  py: number
}

export class CachedMeasure {
  theRef: any;
  private constantResult: boolean;
  private result: CachedMeasureResult | null;

  constructor(constantResult: boolean) {
    this.theRef = useRef(null);
    this.constantResult = constantResult;
    this.result = null;
  }

  GetOrMeasureAsync(): Promise<CachedMeasureResult> {
    return new Promise((resolve, reject) => {
      if (this.result !== null && this.constantResult) {
        resolve(this.result);
      } else if (!this.theRef?.current) {
        reject(new Error("theRef is undefined. It must be set in a ref of element before calling this."));
      } else {
        this.theRef.current.measure((x: number, y: number, width: number, height: number, px: number, py: number) => {
          if (x + y + width + height + px + py === 0) {
            reject(new Error("GetOrMeasure returned all zeroes. It was called at an incorrect time."));
          } else {
            this.result = { x, y, width, height, px, py };
            resolve(this.result);
          }
        });
      }
    });
  }

  GetOrMessure(callback: (result: CachedMeasureResult) => void) {
    if (this.result !== null && this.constantResult) {
      callback(this.result);
    }
    else if (!this.theRef?.current) {
      throw new Error("theRef is undefined. It must be set in a ref of element before calling this.");
    }
    else {
      this.theRef.current.measure((x: number, y: number, width: number, height: number, px: number, py: number) => {
        if (x + y + width + height + px + py === 0)
          throw new Error("GetOrMessure giving all zero result. It is calling incorrected time.");

        this.result = { x, y, width, height, px, py };
        callback(this.result);
      });
    }
  }

  DistanceWithElement(other: CachedMeasure, callback: ({ x, y }: { x: number, y: number }) => void) {
    this.GetOrMessure(resA => {
      other.GetOrMessure(resB => {
        callback({ x: resA.px - resB.px, y: resA.py - resB.py });
      });
    });
  }

  static DistanceWithElement(target: React.MutableRefObject<CachedMeasure>, other: React.MutableRefObject<CachedMeasure>, callback: ({ x, y }: { x: number, y: number }) => void) {
    target.current.DistanceWithElement(other.current, callback);
  }
}

export const IsPointInRectMeasure = ( // main
  x: number,
  y: number,
  measure: CachedMeasureResult) => {
  return IsPointInRect(x, y, measure.px, measure.py, measure.width, measure.height)
}