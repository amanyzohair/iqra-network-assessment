import { HttpParams } from '@angular/common/http';

export function appendParamsFromObject(parameters: Object) {
  let params: HttpParams = new HttpParams();
  Object.entries(parameters).forEach(([key, value]) => {
    if (value) {
      params = params.append(`${key}`, value);
    }
  });
  return params;
}
