import type { Schema, Struct } from '@strapi/strapi';

export interface BlogArticleList extends Struct.ComponentSchema {
  collectionName: 'components_blog_article_lists';
  info: {
    description: 'Comma-separated blog row IDs; FE hydrates article cards';
    displayName: 'Article list';
  };
  attributes: {
    articleIds: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogCategoryList extends Struct.ComponentSchema {
  collectionName: 'components_blog_category_lists';
  info: {
    description: 'Comma-separated health-condition category names';
    displayName: 'Category list';
  };
  attributes: {
    categories: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogFaqBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_faq_blocks';
  info: {
    description: 'Repeatable FAQ list placed anywhere in the body';
    displayName: 'FAQ block';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQs'>;
    items: Schema.Attribute.Component<'shared.faq', true>;
  };
}

export interface BlogMedicineList extends Struct.ComponentSchema {
  collectionName: 'components_blog_medicine_lists';
  info: {
    description: 'Comma-separated master drug codes; FE hydrates product cards';
    displayName: 'Medicine list';
  };
  attributes: {
    drugCodes: Schema.Attribute.Text;
    heading: Schema.Attribute.String;
  };
}

export interface BlogReferencesBlock extends Struct.ComponentSchema {
  collectionName: 'components_blog_references_blocks';
  info: {
    description: 'Repeatable references list placed anywhere in the body';
    displayName: 'References block';
  };
  attributes: {
    heading: Schema.Attribute.String & Schema.Attribute.DefaultTo<'References'>;
    items: Schema.Attribute.Component<'shared.references', true>;
  };
}

export interface BlogSection extends Struct.ComponentSchema {
  collectionName: 'components_blog_sections';
  info: {
    description: 'Heading + rich text block (Quick Summary and any other copy section)';
    displayName: 'Section';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    heading: Schema.Attribute.String;
  };
}

export interface BlogTable extends Struct.ComponentSchema {
  collectionName: 'components_blog_tables';
  info: {
    description: 'Column headings across the top, row headings down the first column. Data cells sit at each intersection.';
    displayName: 'Table';
  };
  attributes: {
    columns: Schema.Attribute.Component<'blog.table-column', true>;
    heading: Schema.Attribute.String;
    rowHeaderLabel: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'blog.table-row', true>;
  };
}

export interface BlogTableCell extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_cells';
  info: {
    description: 'Plain text plus color. Use for a row heading or a data cell. default=black, green, coral.';
    displayName: 'Table cell';
  };
  attributes: {
    color: Schema.Attribute.Enumeration<['default', 'green', 'coral']> &
      Schema.Attribute.DefaultTo<'default'>;
    text: Schema.Attribute.Text;
    weight: Schema.Attribute.Enumeration<['normal', 'bold']> &
      Schema.Attribute.DefaultTo<'normal'>;
  };
}

export interface BlogTableColumn extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_columns';
  info: {
    description: 'One heading across the top. Do not add the row-heading column here \u2014 that is rowHeaderLabel.';
    displayName: 'Column heading';
  };
  attributes: {
    label: Schema.Attribute.String;
  };
}

export interface BlogTableRow extends Struct.ComponentSchema {
  collectionName: 'components_blog_table_rows';
  info: {
    description: 'Row heading (first column) plus one data cell per column heading, left to right.';
    displayName: 'Table row';
  };
  attributes: {
    cells: Schema.Attribute.Component<'blog.table-cell', true>;
    rowHeading: Schema.Attribute.Component<'blog.table-cell', false>;
  };
}

export interface SharedFaq extends Struct.ComponentSchema {
  collectionName: 'components_shared_faqs';
  info: {
    displayName: 'FAQ';
  };
  attributes: {
    Answer: Schema.Attribute.Text;
    Question: Schema.Attribute.Text;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedReferences extends Struct.ComponentSchema {
  collectionName: 'components_shared_references';
  info: {
    displayName: 'References';
  };
  attributes: {
    Author: Schema.Attribute.String;
    Date: Schema.Attribute.Date;
    Title: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSafetyAdvice extends Struct.ComponentSchema {
  collectionName: 'components_shared_safety_advices';
  info: {
    displayName: 'Safety Advice';
  };
  attributes: {
    advices: Schema.Attribute.Text;
    safety_info_tag: Schema.Attribute.Enumeration<
      ['Unsafe', 'Caution', 'Safe', 'Limited information']
    > &
      Schema.Attribute.Required;
    topic: Schema.Attribute.Enumeration<
      [
        'Allergy',
        'Pregnancy',
        'Breastfeeding',
        'Alcohol',
        'Driving',
        'Liver',
        'Kidney',
        'Children',
        'Elderly Patients',
      ]
    > &
      Schema.Attribute.Required;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    advices: Schema.Attribute.Blocks;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blog.article-list': BlogArticleList;
      'blog.category-list': BlogCategoryList;
      'blog.faq-block': BlogFaqBlock;
      'blog.medicine-list': BlogMedicineList;
      'blog.references-block': BlogReferencesBlock;
      'blog.section': BlogSection;
      'blog.table': BlogTable;
      'blog.table-cell': BlogTableCell;
      'blog.table-column': BlogTableColumn;
      'blog.table-row': BlogTableRow;
      'shared.faq': SharedFaq;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.references': SharedReferences;
      'shared.rich-text': SharedRichText;
      'shared.safety-advice': SharedSafetyAdvice;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
