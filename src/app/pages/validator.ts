import {AbstractControl, FormGroup, ValidationErrors} from '@angular/forms';
import {formatDate} from "@angular/common";

export interface AllValidationErrors {
  controlName: string;
  errorName: string;
  errorValue: any;
}

export interface FormGroupControls {
  [key: string]: AbstractControl;
}

export function trimRequired(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control ?  control.value.toString().trim().length : undefined;
  }
  if (value == null || value === 0) {
    return {'required': true};
  }
  return null;
}

export function notSpace(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    const regex = /^.*\s+.*$/;
    if (regex.test(value)) {
      return {'space': true};
    }
  }
  return null;
}

export function email(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value != null && value.trim().length !== 0) {
      // console.log(value.trim().length);
      const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!regex.test(value)) {
        return {'email': true};
      }
    }
  }
  return null;
}

export function notSpaceLogin(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value.trim();
    const regex = /^.*\s+.*$/;
    if (regex.test(value)) {
      return {'space': true};
    }
  }
  return null;
}

export function validEmail(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const regex = /^.*\s+.*$/;
    if (!regex.test(value.trim())) {
      return {'email': true};
    }
  }
  return null;
}

export function validDate(control: AbstractControl): { [key: string]: boolean } | null {
  let d = null;
  if (control && control.value != null) {
    d = control.value;
    // const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    // // const regex = /^.*\s+.*$/;
    // if (!regex.test(value)) {
    //   return {'date': true};
    // }

    if (Object.prototype.toString.call(d) === "[object Date]") {
      // it is a date
      if (isNaN(d.getTime())) {  // d.valueOf() could also work
        // date is not valid
        return {'date': true};
      } else {
        return null;
        // date is valid
      }
    } else {
      return {'date': true};
      // not a date
    }
  }
  return null;
}

export function checkPass(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    if (value.trim().length > 0 && value.trim().length < 6) {
      return {'minlength': true};
    }
    if (value.trim().length > 60) {
      return {'maxlength': true};
    }
    return null;
  }
}


export function checkUser(control: AbstractControl): { [key: string]: boolean } | null {
  let value = null;
  if (control && control.value != null) {
    value = control.value;
    if (value == null || value.trim().length === 0) {
      return {'required': true};
    }
    if (value.trim().length > 50) {
      return {'usersmaxlength': true};
    }
    return null;
  }
}



export function validPassword(form: FormGroup) {
  const regex = /^.*\s+.*$/;
  if (form.get('newPass') && form.get('comPass')) {
    if (form.get('newPass').value.trim() === null || form.get('newPass').value.trim() === ''
      || form.get('newPass').value === undefined) {
      return {'required': true };
    }
    if (form.get('comPass').value.trim().length > 0 && form.get('comPass').value.trim().length < 8) {
      return {'minlength': true};
    }
    if (form.get('comPass').value.trim().length > 50) {
      return {'maxlength': true};
    }
    if (regex.test(form.get('comPass').value.trim())) {
      return {'space': true};
    }
    if (form.get('newPass').value.trim() === form.get('comPass').value.trim()) {
      form.get('comPass').setErrors(null);
      return null;
    }
    form.get('comPass').setErrors({passwordMustMatchChange: true});
  }
  return null;
}

export function passwordsMatchValidator(form: FormGroup) {
  if (form.get('passwordHash') && form.get('rePassword')) {
    if (form.get('passwordHash').value === form.get('rePassword').value) {
      form.get('rePassword').setErrors(null);
      return null;
    }
    form.get('rePassword').setErrors({notMatchPassword: true});
  }
  return null;
}


export function getFormValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
  let errors: AllValidationErrors[] = [];
  Object.keys(controls).forEach(key => {
    const control = controls[key];
    if (control instanceof FormGroup) {
      errors = errors.concat(getFormValidationErrors(control.controls));
    }
    const controlErrors: ValidationErrors = controls[key].errors;
    if (controlErrors !== null) {
      Object.keys(controlErrors).forEach(keyError => {
        errors.push({
          controlName: key,
          errorName: keyError,
          errorValue: controlErrors[keyError],
        });
      });
    }
  });
  return errors;
}

export function checkVaidDate(value: any) {
  const regex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
  if (!regex.test(value)) {
    return false;
  }
  return true;
}

export function checkMulDate(start: any , end: any) {
  if (start == null && end == null) {
    return true;
  } else {
    if (start == null && new Date(formatDate(end, 'yyyy-MM-dd', 'en-us')) < new Date(formatDate(new Date(new Date().setFullYear(new Date().getFullYear() - 1)), 'yyyy-MM-dd', 'en-us'))) {
      return false;
    } else if (end == null && new Date(formatDate(new Date(), 'yyyy-MM-dd', 'en-us')) < new Date(formatDate(start, 'yyyy-MM-dd', 'en-us'))) {
      return false;
    } else if (start != null && end != null && new Date(formatDate(end, 'yyyy-MM-dd', 'en-us')) < new Date(formatDate(start, 'yyyy-MM-dd', 'en-us'))) {
      return false;
    } else {
      return true;
    }
  }
}

export function getValueError(control: string, key: string): string {
  let controlName = '';
  let errorValue = '';
  switch (control) {
    case 'userName':
      controlName = 'Tên đăng nhập';
      break;
    case 'fullName':
      controlName = 'Tên đầy đủ';
      break;
    case 'tel':
      controlName = 'Số điện thoại';
      break;
    case 'email':
      controlName = 'Email';
      break;
    case 'password':
      controlName = 'Password';
      break;
    case 'passwordHash':
      controlName = 'Mật khẩu';
      break;
    case 'oldPass':
      controlName = 'Mật khẩu cũ';
      break;
    case 'newPass':
      controlName = 'Mật khẩu mới';
      break;
    case 'comPass':
      controlName = 'Nhập lại mật khẩu';
      break;
    case 'rePassword':
      controlName = 'Nhập lại mật khẩu';
      break;
    case 'imageUrl':
      controlName = 'Đường dẫn ảnh';
      break;
    case 'deptId':
      controlName = 'Phòng ban';
      break;
    case 'author':
      controlName = 'Quyền người dùng';
      break;
    case 'status':
      controlName = 'Trạng thái';
      break;
    case 'code':
      controlName = 'Mã action';
      break;
    case 'name':
      controlName = 'Tên action';
      break;
    default:
      controlName = '';
      break;
  }
  switch (key) {
    case 'validEmail':
      errorValue = 'không đúng định dạng';
      break;
    case 'required':
      errorValue = 'không được để trống';
      break;
    case 'maxlength':
      errorValue = 'vượt quá ký tự cho phép';
      break;
    case 'loginmaxlength':
      errorValue = 'nhập tối đa 60 ký tự';
      break;
    case 'usersmaxlength':
      errorValue = 'nhập tối đa 50 ký tự';
      break;
    case 'minlength':
      errorValue = 'tối thiểu 6 ký tự';
      break;
    case 'notMatchPassword':
      errorValue = 'không đúng';
      break;
    case 'notMatchPasswordNew':
      errorValue = 'chưa nhập';
      break;
    case 'email':
      errorValue = 'không đúng định dạng';
      break;
    case 'space':
      errorValue = 'không được chứa dấu cách';
      break;
    case 'formatDate':
      errorValue = 'không đúng định dạng dd/MM/yyyy';
      break;
    default:
      errorValue = '';
      break;
  }
  return controlName + ' ' + errorValue;
}
