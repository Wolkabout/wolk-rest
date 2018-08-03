import TemplateAttributeType from './enumeration/TemplateAttributeType';

interface TemplateAttribute {
  name: string;
  id?: number;
  type: TemplateAttributeType;
  required: boolean;
}

export default TemplateAttribute;
