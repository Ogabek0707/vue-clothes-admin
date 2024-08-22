import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import { required, min, max, email } from '@vee-validate/rules'

export default{
      install(app){
            app.component("VeeForm", Form)
            app.component("VeeField", Field)
            app.component("ErrorMessage", ErrorMessage)

            defineRule("required", required)
            defineRule("min", min)
            defineRule("max", max)
            defineRule("email", email)
            defineRule("validSize", (value) => {
                  const validSizes = ['M', 'CM', 'D', 'C', 'XC', 'L', 'XL', 'X', 'V', 'I'];
            
                  if (!value) {
                    return true; // Bosh maydon bo'lishi mumkin
                  }
            
                  const sizes = value.split(',').map(size => size.trim());
            
                  if (sizes.every(size => validSizes.includes(size))) {
                    return true;
                  }
            
                  return `Size must be one or more of the following: ${validSizes.join(', ')}`;
                });
            configure({
                  generateMessage:(ctx)=>{
                        const message = {
                              required: `${ctx.field} is required`,
                              min: `${ctx.field} is must be at least 6 characters and contain at least one uppercase and one lowercase letter`,
                              max: `${ctx.field} is number of characters exceeded`,
                              email: `The field ${ctx.field} is too long`,
                              validSize: `${ctx.field} must be one or more of the following: M, CM, D, C, XC, L, XL, X, V, I`,
                        }
                        return message[(ctx.rule.name)] ? message[(ctx.rule.name)] : `${ctx} is required`
                  },
                  validateOnBlur: true,
                  validateOnChange: true,
                  validateOnModelUpdate: true,
                  validateOnInput: true
            })
      }
}