import throttle from 'lodash.throttle';
import localStorage from './storage';

const dataKey = 'feedback-form-state';
const delayTrottle = 500;

const formRef = document.querySelector('.feedback-form');

formRef.addEventListener('input', throttle(onFormInput, delayTrottle));
formRef.addEventListener('submit', onFormSubmit);
onPageLoad(formRef);

function onFormInput(event) {
  const formData = new FormData(event.target.closest('.feedback-form'));
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });

  localStorage.save(dataKey, formDataObj);
}

function onPageLoad(formReference) {
  const formDataObj = localStorage.load(dataKey);
  if (!formDataObj) {
    return;
  }
  const {
    elements: { email, message },
  } = formReference;
  email.value = formDataObj.email;
  message.value = formDataObj.message;
}

function onFormSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formDataObj = {};
  formData.forEach((value, key) => {
    formDataObj[key] = value;
  });
  if (!formDataObj.email) {
    alert('Please fill email');
    return;
  } else if (!formDataObj.message) {
    alert('Please fill message');
    return;
  } else {
    console.log(formDataObj);
    localStorage.remove(dataKey);
    event.currentTarget.reset();
  }
}
