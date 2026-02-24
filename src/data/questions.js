export const questions = [
  {
    id: 1,
    question: "Which command installs Drupal 10 using Composer?",
    choices: [
      "composer create-project drupal/recommended-project my-site",
      "composer install drupal/drupal",
      "npm install drupal@10",
      "drush dl drupal"
    ],
    answer: 0,
    explanation:
      "The official way to start a new Drupal project is with 'composer create-project drupal/recommended-project'."
  },
  {
    id: 2,
    question: "What is the primary purpose of Drupal's Configuration Management system?",
    choices: [
      "To manage user accounts and roles",
      "To export, version-control, and import site configuration between environments",
      "To cache rendered HTML pages",
      "To synchronise the database between servers"
    ],
    answer: 1,
    explanation:
      "Configuration Management lets teams track configuration in YAML files and deploy it across dev/staging/production environments."
  },
  {
    id: 3,
    question:
      "Which core module provides a REST-based hypermedia API that exposes Drupal entities as JSON resources?",
    choices: [
      "RESTful Web Services",
      "HAL",
      "JSON:API",
      "Serialization"
    ],
    answer: 2,
    explanation:
      "The JSON:API module (included in Drupal 8.7+ core) exposes all content entities following the JSON:API specification."
  },
  {
    id: 4,
    question: "What was the minimum PHP version required at the initial release of Drupal 10?",
    choices: [
      "PHP 7.4",
      "PHP 8.0",
      "PHP 8.1",
      "PHP 8.2"
    ],
    answer: 2,
    explanation:
      "Drupal 10.0 required PHP 8.1 as the minimum version, dropping support for PHP 7.x entirely."
  },
  {
    id: 5,
    question:
      "Which front-end theme is the default administration theme introduced in Drupal 10?",
    choices: [
      "Seven",
      "Bartik",
      "Claro",
      "Olivero"
    ],
    answer: 2,
    explanation:
      "Claro became the default administration theme in Drupal 10, replacing Seven. Olivero replaced Bartik as the default front-end theme."
  },
  {
    id: 6,
    question:
      "In Drupal, what is the correct hook to alter an existing form before it is rendered?",
    choices: [
      "hook_form_alter()",
      "hook_alter_form()",
      "hook_form_modify()",
      "hook_preprocess_form()"
    ],
    answer: 0,
    explanation:
      "hook_form_alter() is used to modify any existing form. You can also target a specific form with hook_form_FORM_ID_alter()."
  },
  {
    id: 7,
    question:
      "Which Drupal concept allows you to define reusable, fieldable data objects that can have different storage backends?",
    choices: [
      "Content types",
      "Entities",
      "Blocks",
      "Paragraphs"
    ],
    answer: 1,
    explanation:
      "The Entity API is the abstraction layer for all data objects in Drupal (nodes, users, taxonomy terms, etc.), each supporting custom fields and multiple storage backends."
  },
  {
    id: 8,
    question: "What Drush command exports the active configuration to the sync directory?",
    choices: [
      "drush config-pull",
      "drush config-export (cex)",
      "drush config-push",
      "drush config-sync"
    ],
    answer: 1,
    explanation:
      "'drush config:export' (alias: cex) writes the active configuration from the database to YAML files in the configured sync directory."
  },
  {
    id: 9,
    question:
      "Which core module in Drupal handles the migration of content from Drupal 7 to Drupal 10?",
    choices: [
      "Content Migration",
      "Migrate Plus",
      "Migrate Drupal",
      "Upgrade Status"
    ],
    answer: 2,
    explanation:
      "The Migrate Drupal module (part of Drupal core) provides migration paths from older Drupal versions. Migrate Plus is a popular contributed module that extends it."
  },
  {
    id: 10,
    question: "What is the purpose of the 'Olivero' theme in Drupal 10?",
    choices: [
      "It is the default administration theme",
      "It is the default front-end (end-user) theme",
      "It is a contrib theme for e-commerce sites",
      "It is the base theme for Claro"
    ],
    answer: 1,
    explanation:
      "Olivero is Drupal 10's default front-end theme, replacing Bartik. It features a modern, accessible design."
  },
  {
    id: 11,
    question: "In Drupal's Views module, what is a 'Display'?",
    choices: [
      "A CSS class applied to the view output",
      "A specific output format such as Page, Block, REST export, or Feed",
      "A column definition for tabular data",
      "A permission that controls who can see the view"
    ],
    answer: 1,
    explanation:
      "A Display in Views defines how and where the results are rendered—e.g., as a Page (at a URL), a Block, a REST Export, or an Attachment."
  },
  {
    id: 12,
    question:
      "Which Drupal 11 change deprecated older CKEditor 4 in favour of a newer editor?",
    choices: [
      "Drupal 11 ships CKEditor 5 as the only supported rich-text editor",
      "Drupal 11 removed all WYSIWYG editors",
      "Drupal 11 added TinyMCE as default",
      "Drupal 11 replaced CKEditor with Quill"
    ],
    answer: 0,
    explanation:
      "Drupal 10.0 introduced CKEditor 5 support and deprecated CKEditor 4; Drupal 11 ships CKEditor 5 as the only built-in rich-text editor."
  },
  {
    id: 13,
    question:
      "What does the Drupal 'Services' concept (in core) allow you to define in a module's *.services.yml file?",
    choices: [
      "REST API endpoints",
      "Dependency-injected PHP classes registered in the service container",
      "Drupal Form API elements",
      "Database table schemas"
    ],
    answer: 1,
    explanation:
      "Drupal uses a Symfony-based Dependency Injection container. Modules register PHP class services (with their dependencies) in a *.services.yml file."
  },
  {
    id: 14,
    question:
      "Which Drupal core concept maps a URL path to a PHP controller, form, or view?",
    choices: [
      "Hook system",
      "Route",
      "Plugin",
      "Theme suggestion"
    ],
    answer: 1,
    explanation:
      "Drupal's routing system (via *.routing.yml files) maps URL paths to controllers, forms, or views—similar to Symfony's routing component."
  },
  {
    id: 15,
    question:
      "What is the recommended way to add a third-party JavaScript library to a Drupal 10 theme or module?",
    choices: [
      "Place the JS file in the /js folder; Drupal auto-discovers it",
      "Define a library in a *.libraries.yml file and attach it via #attached or a hook",
      "Add a <script> tag directly to the page.html.twig template",
      "Use npm install inside the module folder"
    ],
    answer: 1,
    explanation:
      "Drupal uses asset libraries defined in *.libraries.yml. They are attached to render arrays via '#attached' => ['library' => [...]] or hook_page_attachments()."
  }
];
