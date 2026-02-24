import React, { useState, useMemo, useCallback } from 'react';
import { CheckCircle, XCircle, Trophy, RotateCcw, Play, ArrowRight, BookOpen, Layers, Zap, Shield, Code, Settings } from 'lucide-react';

const QUESTIONS = [
  // 🟢 Developer Level (12 Questions)
  {
    id: 1,
    difficulty: "developer",
    topic: "Installation & Configuration",
    question: "Which Drush command is used to export the active configuration to the sync directory?",
    options: {
      A: "drush config:import (drush cim)",
      B: "drush site:install (drush si)",
      C: "drush config:export (drush cex)",
      D: "drush cache:rebuild (drush cr)"
    },
    correct: "C",
    explanation: "The command 'drush config:export' or 'drush cex' exports the active configuration from the database to the designated configuration sync directory as YAML files."
  },
  {
    id: 2,
    difficulty: "developer",
    topic: "Site Building",
    question: "What is the primary purpose of a 'Content Type' in Drupal?",
    options: {
      A: "To define the visual layout of a page",
      B: "To define a bundle for node entities that shares the same fields and settings",
      C: "To manage user roles and permissions",
      D: "To create custom database tables automatically"
    },
    correct: "B",
    explanation: "A Content Type is a bundle of the Node entity type. It allows site builders to create specific types of content (like Articles or Basic Pages) with their own distinct sets of fields and display settings."
  },
  {
    id: 3,
    difficulty: "developer",
    topic: "Theming",
    question: "Which templating engine is used by default in modern Drupal (8, 9, 10, 11)?",
    options: {
      A: "Blade",
      B: "Smarty",
      C: "PHPTemplate",
      D: "Twig"
    },
    correct: "D",
    explanation: "Drupal uses Twig, a modern template engine for PHP, which compiles templates down to plain optimized PHP code and provides a secure, fast, and flexible templating environment."
  },
  {
    id: 4,
    difficulty: "developer",
    topic: "Directory Structure",
    question: "Where is the recommended location to place custom modules in a standard Drupal 10/11 installation?",
    options: {
      A: "/core/modules/custom",
      B: "/modules/custom",
      C: "/sites/all/modules/custom",
      D: "/web/modules/custom"
    },
    correct: "D",
    explanation: "In modern Composer-based Drupal project structures (using the recommended template), the document root is typically '/web', so custom modules belong in '/web/modules/custom'."
  },
  {
    id: 5,
    difficulty: "developer",
    topic: "Site Building",
    question: "Which core module must be enabled to add custom fields to content types?",
    options: {
      A: "Field",
      B: "Layout Builder",
      C: "Views",
      D: "Entity API"
    },
    correct: "A",
    explanation: "The core Field module (along with Field UI for the interface) provides the infrastructure to attach custom data fields to Drupal entities like nodes, users, and taxonomy terms."
  },
  {
    id: 6,
    difficulty: "developer",
    topic: "Drush",
    question: "What is the standard Drush command to clear or rebuild the cache in modern Drupal?",
    options: {
      A: "drush cache-clear (drush cc)",
      B: "drush cache:rebuild (drush cr)",
      C: "drush clear:all (drush cla)",
      D: "drush rebuild:cache (drush rc)"
    },
    correct: "B",
    explanation: "Since Drupal 8, the command 'drush cache:rebuild' (or 'drush cr') is used to completely rebuild the cache and the dependency injection container. 'drush cc' was used in Drupal 7."
  },
  {
    id: 7,
    difficulty: "developer",
    topic: "Package Management",
    question: "What tool is the standard package manager used to manage Drupal core, contrib modules, and their PHP dependencies?",
    options: {
      A: "npm",
      B: "Yarn",
      C: "Composer",
      D: "PEAR"
    },
    correct: "C",
    explanation: "Composer is the standard dependency manager for PHP and is heavily relied upon by modern Drupal to manage core, contributed modules, themes, and external libraries."
  },
  {
    id: 8,
    difficulty: "developer",
    topic: "Views",
    question: "In the Views module, what is the purpose of a 'Contextual Filter'?",
    options: {
      A: "To filter results based on dynamic values from the URL or environment",
      B: "To expose a search form to the end user",
      C: "To format the output as a grid or list",
      D: "To restrict access to the view based on user roles"
    },
    correct: "A",
    explanation: "Contextual filters (formerly known as arguments in D7) allow a View to filter its results dynamically based on information provided in the URL, the current logged-in user, or other environmental context."
  },
  {
    id: 9,
    difficulty: "developer",
    topic: "Module Development",
    question: "Which hook is commonly used to alter an existing form before it is rendered?",
    options: {
      A: "hook_form_submit()",
      B: "hook_form_alter()",
      C: "hook_entity_presave()",
      D: "hook_page_attachments()"
    },
    correct: "B",
    explanation: "hook_form_alter() (and its targeted variant hook_form_FORM_ID_alter()) allows modules to modify any form built by Drupal's Form API before it is rendered to the user."
  },
  {
    id: 10,
    difficulty: "developer",
    topic: "Module Development",
    question: "What file provides essential metadata like the module's name, description, and dependencies?",
    options: {
      A: "module_name.module",
      B: "module_name.routing.yml",
      C: "module_name.info.yml",
      D: "composer.json"
    },
    correct: "C",
    explanation: "The .info.yml file is required for every module and theme. It tells Drupal about the extension's name, type, description, core version requirement, and dependencies."
  },
  {
    id: 11,
    difficulty: "developer",
    topic: "Theming",
    question: "How do you pass a new variable from a PHP preprocess function to a Twig template?",
    options: {
      A: "Return an array from the preprocess function",
      B: "Assign the value to the $variables array passed by reference",
      C: "Use the \\Drupal::state()->set() method",
      D: "Declare it globally using the 'global' keyword"
    },
    correct: "B",
    explanation: "In a preprocess function (e.g., template_preprocess_node(&$variables)), you add or modify variables by altering the $variables array, which is then made available in the corresponding Twig template."
  },
  {
    id: 12,
    difficulty: "developer",
    topic: "Site Building",
    question: "What feature does the core 'Layout Builder' module provide?",
    options: {
      A: "A drag-and-drop visual design tool for customizing page layouts",
      B: "An automated way to build CSS grids",
      C: "A tool to migrate layouts from Drupal 7 to Drupal 10",
      D: "A WYSIWYG editor for content creation"
    },
    correct: "A",
    explanation: "Layout Builder allows site builders to visually design layouts for content types or individual entities using a drag-and-drop interface, placing fields and blocks into structured regions."
  },

  // 🟡 Mid-Level Developer (16 Questions)
  {
    id: 13,
    difficulty: "mid-level",
    topic: "Module Development",
    question: "Which modern architectural concept replaces `hook_init()` and `hook_boot()` from Drupal 7?",
    options: {
      A: "Preprocess functions",
      B: "Event Subscribers",
      C: "Plugin Derivatives",
      D: "Middleware"
    },
    correct: "B",
    explanation: "Drupal utilizes the Symfony EventDispatcher component. Instead of hook_init(), developers now write Event Subscribers that listen to kernel events (like KernelEvents::REQUEST) to execute logic early in the request lifecycle."
  },
  {
    id: 14,
    difficulty: "mid-level",
    topic: "Architecture",
    question: "What is Dependency Injection in the context of Drupal custom module development?",
    options: {
      A: "A security mechanism to prevent SQL injection attacks",
      B: "A pattern where objects receive their required services from an external container rather than instantiating them directly",
      C: "The process of injecting JavaScript into the page header",
      D: "A method to load modules dynamically at runtime"
    },
    correct: "B",
    explanation: "Dependency Injection (DI) allows classes to receive dependencies (like database connections or logging services) via their constructor, making code more decoupled, testable, and robust."
  },
  {
    id: 15,
    difficulty: "mid-level",
    topic: "Performance",
    question: "Which caching strategy flushes the initial HTML quickly and streams personalized/dynamic placeholders afterward?",
    options: {
      A: "Dynamic Page Cache",
      B: "Varnish",
      C: "BigPipe",
      D: "Internal Page Cache"
    },
    correct: "C",
    explanation: "The BigPipe module, included in core, sends the cacheable parts of a page immediately and then streams the uncacheable, dynamic parts (lazy builders) to the browser, significantly improving perceived performance."
  },
  {
    id: 16,
    difficulty: "mid-level",
    topic: "Routing",
    question: "In which file do you define a custom page route (URL to Controller mapping) in a custom module?",
    options: {
      A: "module_name.routing.yml",
      B: "module_name.links.menu.yml",
      C: "module_name.services.yml",
      D: "module_name.permissions.yml"
    },
    correct: "A",
    explanation: "Routes are defined in the module_name.routing.yml file, mapping a path (e.g., '/my-custom-page') to a specific Controller method and defining access requirements."
  },
  {
    id: 17,
    difficulty: "mid-level",
    topic: "Plugins",
    question: "Historically, what mechanism has Drupal primarily used to discover Plugins (like Blocks or Field Formatters)?",
    options: {
      A: "XML Configuration files",
      B: "Annotations in PHP DocBlocks",
      C: "Database queries",
      D: "YAML configuration files"
    },
    correct: "B",
    explanation: "Drupal has heavily relied on Doctrine Annotations placed in the docblocks of plugin classes to discover and instantiate plugins. Note: Drupal 10/11 are migrating towards PHP 8 Attributes."
  },
  {
    id: 18,
    difficulty: "mid-level",
    topic: "Migrate API",
    question: "What are the three primary pipeline stages of a Drupal Migration?",
    options: {
      A: "Extract, Transform, Load (ETL)",
      B: "Source, Process, Destination",
      C: "Query, Map, Import",
      D: "Fetch, Parse, Save"
    },
    correct: "B",
    explanation: "The Migrate API uses three main plugins for a migration: 'Source' (fetches the old data), 'Process' (transforms the data), and 'Destination' (saves the data as Drupal entities)."
  },
  {
    id: 19,
    difficulty: "mid-level",
    topic: "Cache API",
    question: "Which Cache API concept allows invalidating cached items automatically when underlying data (like a Node) is updated?",
    options: {
      A: "Cache Contexts",
      B: "Cache Max-Age",
      C: "Cache Bins",
      D: "Cache Tags"
    },
    correct: "D",
    explanation: "Cache Tags describe what data a cached item depends on (e.g., 'node:5'). When node 5 is updated, Drupal invalidates all cache items tagged with 'node:5' simultaneously."
  },
  {
    id: 20,
    difficulty: "mid-level",
    topic: "Configuration",
    question: "What is the primary purpose of the 'Config Split' module?",
    options: {
      A: "To split large YAML files into smaller ones for easier reading",
      B: "To manage different configuration environments (e.g., dev, stage, prod) by splitting out environment-specific configs",
      C: "To separate configuration from content entities",
      D: "To allow multiple users to edit configuration simultaneously"
    },
    correct: "B",
    explanation: "Config Split allows you to define sets of configuration that are only active in certain environments. For example, keeping the Devel module enabled in 'dev' but completely excluded in 'prod'."
  },
  {
    id: 21,
    difficulty: "mid-level",
    topic: "Security",
    question: "How should you query the database to prevent SQL injection in custom module code?",
    options: {
      A: "Using standard PHP mysqli_query() with addslashes()",
      B: "Using Drupal's Database Abstraction Layer (db_query or dynamic queries with placeholders)",
      C: "By sanitizing input with htmlspecialchars() before querying",
      D: "Using PDO directly without prepared statements"
    },
    correct: "B",
    explanation: "You must use Drupal's database abstraction layer (e.g., \\Drupal::database()->select() or ->query() with named placeholders), which automatically uses PDO prepared statements to prevent SQL injection."
  },
  {
    id: 22,
    difficulty: "mid-level",
    topic: "APIs",
    question: "Which core module provides a zero-configuration, specification-compliant API for exposing Drupal entities?",
    options: {
      A: "RESTful Web Services",
      B: "GraphQL",
      C: "JSON:API",
      D: "Services"
    },
    correct: "C",
    explanation: "The JSON:API core module provides a strict, specification-compliant RESTful API out-of-the-box, allowing consumers to fetch, create, update, and delete entities with minimal configuration."
  },
  {
    id: 23,
    difficulty: "mid-level",
    topic: "Cache API",
    question: "What is the difference between Cache Tags and Cache Contexts?",
    options: {
      A: "Tags dictate how long to cache; Contexts dictate when to invalidate",
      B: "Tags are for nodes; Contexts are for users",
      C: "Tags invalidate cache when data changes; Contexts vary the cache based on request characteristics (like user role or URL)",
      D: "There is no difference; they are interchangeable"
    },
    correct: "C",
    explanation: "Cache Tags handle cache invalidation (data dependencies). Cache Contexts handle cache variation (request dependencies, e.g., 'user.roles' caches a different version of a block per user role)."
  },
  {
    id: 24,
    difficulty: "mid-level",
    topic: "Testing",
    question: "When writing a test that requires simulating a real web browser and testing JavaScript interactions, which PHPUnit test base should you use?",
    options: {
      A: "UnitTestCase",
      B: "KernelTestBase",
      C: "BrowserTestBase",
      D: "WebDriverTestBase"
    },
    correct: "D",
    explanation: "WebDriverTestBase uses Selenium/ChromeDriver to run tests in an actual browser, allowing you to test JavaScript-heavy UI interactions, which BrowserTestBase cannot do."
  },
  {
    id: 25,
    difficulty: "mid-level",
    topic: "Entities",
    question: "How are Configuration Entities fundamentally different from Content Entities?",
    options: {
      A: "Config entities are stored as YAML and are deployable; Content entities are stored in database tables and are not naturally deployable.",
      B: "Config entities cannot be translated, but Content entities can.",
      C: "Config entities are fieldable, while Content entities are not.",
      D: "Content entities can only be created by admins, Config entities by any user."
    },
    correct: "A",
    explanation: "Configuration entities (like Views, Content Types, Image Styles) are synced via config management (YAML). Content entities (like Nodes, Users, Taxonomy Terms) hold site data and are not part of configuration syncing."
  },
  {
    id: 26,
    difficulty: "mid-level",
    topic: "Hooks",
    question: "What is the primary function of `hook_theme()` in a module or theme?",
    options: {
      A: "To change the active theme programmatically",
      B: "To register new Twig templates and their default variables (theme hooks)",
      C: "To inject CSS and JavaScript into the page",
      D: "To alter the output of an existing template"
    },
    correct: "B",
    explanation: "hook_theme() is used to register custom theme hooks, mapping them to Twig templates and defining the variables those templates expect to receive."
  },
  {
    id: 27,
    difficulty: "mid-level",
    topic: "Module Development",
    question: "How do you define a custom Block programmatically in Drupal?",
    options: {
      A: "By creating a Controller class that extends ControllerBase",
      B: "By writing a hook_block_info() implementation",
      C: "By creating a class in the Plugin/Block directory with a @Block annotation",
      D: "By configuring it in blocks.routing.yml"
    },
    correct: "C",
    explanation: "Blocks are Plugins. You create them by adding a PHP class in 'src/Plugin/Block', implementing BlockPluginInterface (usually extending BlockBase), and adding a @Block attribute/annotation."
  },
  {
    id: 28,
    difficulty: "mid-level",
    topic: "Routing",
    question: "How can you return a JSON response from a custom Controller?",
    options: {
      A: "Return a standard render array with '#type' => 'json'",
      B: "Return a Symfony \\Symfony\\Component\\HttpFoundation\\JsonResponse object",
      C: "Print the JSON using json_encode() and call exit()",
      D: "Use hook_preprocess_html() to strip HTML tags"
    },
    correct: "B",
    explanation: "Controllers in Drupal are built on Symfony's HTTP Kernel. Returning a new JsonResponse(['key' => 'value']) instructs the kernel to format and send a proper JSON HTTP response."
  },

  // 🔴 Senior Developer (12 Questions)
  {
    id: 29,
    difficulty: "senior",
    topic: "Performance",
    question: "How does the Render API handle `#lazy_builder` elements?",
    options: {
      A: "It defers rendering of highly dynamic parts until just before the page is sent, keeping the surrounding render array cacheable.",
      B: "It loads JavaScript asynchronously in the footer to render the element on the client side.",
      C: "It offloads the rendering process to a background Cron job.",
      D: "It builds the element once and caches it indefinitely in the database."
    },
    correct: "A",
    explanation: "#lazy_builder is crucial for caching. It tells the Render API to cache the page with a placeholder, and then dynamically evaluates a callback to replace the placeholder at the very end of the page build process."
  },
  {
    id: 30,
    difficulty: "senior",
    topic: "Upgrading",
    question: "What is the recommended approach to identify and fix deprecated code when preparing for a major version upgrade (e.g., Drupal 10 to 11)?",
    options: {
      A: "Manually searching the codebase for the word '@deprecated'",
      B: "Using the 'drupal-check' CLI tool, the Upgrade Status module, and Drupal Rector",
      C: "Running `drush updb` and checking the error logs",
      D: "Upgrading core directly and fixing fatal errors as they appear"
    },
    correct: "B",
    explanation: "Upgrade Status provides a UI report, drupal-check offers CLI PHPStan-based static analysis for deprecations, and Drupal Rector can automatically refactor many deprecated API calls to their modern equivalents."
  },
  {
    id: 31,
    difficulty: "senior",
    topic: "Architecture",
    question: "How do you properly override an existing core service (e.g., replacing the 'logger.factory' service with a custom implementation)?",
    options: {
      A: "Edit the core core.services.yml file directly",
      B: "Use hook_service_alter() in your .module file",
      C: "Create a ServiceProvider class in your module and implement the alter() method to modify the ContainerBuilder",
      D: "Redefine the service name in your module's routing.yml"
    },
    correct: "C",
    explanation: "To alter services, your module must provide a class named CamelCasedModuleNameServiceProvider in the root `src` directory that implements ServiceModifierInterface (usually extending ServiceProviderBase), using the alter() method."
  },
  {
    id: 32,
    difficulty: "senior",
    topic: "Composer Workflows",
    question: "What is the primary function of the `drupal/core-composer-scaffold` plugin?",
    options: {
      A: "To generate boilerplate code for new custom modules",
      B: "To manage node_modules and NPM dependencies automatically",
      C: "To place scaffold files (like index.php, .htaccess, robots.txt) into the correct document root directories during `composer install`",
      D: "To scaffold a standard Drupal database schema"
    },
    correct: "C",
    explanation: "The scaffold plugin is responsible for copying necessary files from the drupal/core package out to the web root (e.g., .htaccess, index.php), allowing the core directory to remain untouched and cleanly managed by Composer."
  },
  {
    id: 33,
    difficulty: "senior",
    topic: "Security",
    question: "How do you protect a custom routing endpoint that performs state-changing operations (like deleting an entity) from CSRF attacks?",
    options: {
      A: "Add `_csrf_token: 'TRUE'` to the route's requirements in routing.yml",
      B: "Check the `HTTP_REFERER` header in the Controller",
      C: "Use a simple `$_GET['token']` parameter that is randomly generated",
      D: "Require the `administer site configuration` permission"
    },
    correct: "A",
    explanation: "By adding `_csrf_token: 'TRUE'` to the route requirements, Drupal's routing system automatically validates that the incoming request includes a valid CSRF token generated by the current user's session."
  },
  {
    id: 34,
    difficulty: "senior",
    topic: "Modern PHP / D11",
    question: "Starting heavily in Drupal 10.2+ and required in Drupal 11, what replaces Doctrine Annotations for defining Plugin metadata?",
    options: {
      A: "XML Configuration files",
      B: "YAML Discovery",
      C: "PHP 8 Attributes",
      D: "JSON schema validation"
    },
    correct: "C",
    explanation: "Drupal is moving away from parsing comments (Doctrine Annotations) to natively supported PHP 8 Attributes for defining plugin metadata (e.g., #[Block(id: 'my_block', admin_label: new TranslatableMarkup('My Block'))])."
  },
  {
    id: 35,
    difficulty: "senior",
    topic: "Multisite",
    question: "In a Drupal multisite setup, how does Drupal determine which site directory's `settings.php` to load?",
    options: {
      A: "By examining the `sites.php` file mapping and falling back to a directory matching the request domain",
      B: "By reading an environment variable defined in `.htaccess`",
      C: "By querying the primary database's `sites_registry` table",
      D: "By checking the `multisite.yml` configuration file in the project root"
    },
    correct: "A",
    explanation: "Drupal inspects the HTTP host and compares it against the mappings defined in `sites/sites.php`. If no mapping exists, it attempts to find a folder in `sites/` that exactly matches the domain (e.g., `sites/example.com`)."
  },
  {
    id: 36,
    difficulty: "senior",
    topic: "Database API",
    question: "What is the correct and robust way to alter the query conditions of an EntityQuery executed by another module?",
    options: {
      A: "Use hook_query_alter()",
      B: "It is not possible to alter EntityQueries; you must override the Controller.",
      C: "Ensure the query has an `addTag('tag_name')` and implement `hook_query_TAG_alter()`.",
      D: "Use hook_entity_presave() to change the data before the query runs."
    },
    correct: "C",
    explanation: "Unlike the old db_select, EntityQueries cannot be easily altered globally. To make an EntityQuery alterable, the developer must attach a tag using `->addTag('my_tag')`. Other modules can then implement `hook_query_my_tag_alter()`."
  },
  {
    id: 37,
    difficulty: "senior",
    topic: "Performance",
    question: "What is the fundamental difference between the core 'Page Cache' and 'Dynamic Page Cache' modules?",
    options: {
      A: "Page Cache uses the database; Dynamic Page Cache uses Redis/Memcache.",
      B: "Page Cache caches full HTML for anonymous users only; Dynamic Page Cache caches render arrays and works for both anonymous and authenticated users.",
      C: "Page Cache caches assets (CSS/JS); Dynamic Page Cache caches HTML.",
      D: "There is no difference; Dynamic Page Cache is just the Drupal 10 name for Page Cache."
    },
    correct: "B",
    explanation: "Page Cache intercepts requests very early and serves full HTML pages to anonymous users. Dynamic Page Cache caches the render arrays (respecting contexts and tags) and helps speed up responses for all users, including authenticated ones."
  },
  {
    id: 38,
    difficulty: "senior",
    topic: "Cache API",
    question: "When creating a custom cache bin in a custom module, what must you define in your `services.yml` file?",
    options: {
      A: "A database table definition schema",
      B: "A new factory service tagged with `cache.bin` that uses `cache.backend.default` or similar",
      C: "A YAML array of cache tags",
      D: "An EventSubscriber listening to `CacheEvents::CREATE`"
    },
    correct: "B",
    explanation: "To create a custom cache bin (e.g., 'cache.my_custom_bin'), you define a service using a factory class (like `cache_factory:get`) and tag the service with `{ name: cache.bin }`."
  },
  {
    id: 39,
    difficulty: "senior",
    topic: "Dependency Injection",
    question: "How do you properly inject a service (like the Database connection) into a custom Block Plugin?",
    options: {
      A: "Call `\\Drupal::database()` inside the `build()` method.",
      B: "Pass it to the Block's `__construct()` method directly; Drupal resolves it automatically via Reflection.",
      C: "Implement `ContainerFactoryPluginInterface` and use the `create()` method to pull the service from the container and pass it to `__construct()`.",
      D: "Define the dependency in the Block's annotation."
    },
    correct: "C",
    explanation: "Plugins do not use constructor injection automatically like normal services. To use DI in a plugin, the class must implement `ContainerFactoryPluginInterface`. The `create()` method is invoked, giving access to the Container to extract services."
  },
  {
    id: 40,
    difficulty: "senior",
    topic: "Render Pipeline",
    question: "In the Render API, what does `#pre_render` do compared to `#post_render`?",
    options: {
      A: "There is no difference; they are aliases for the same function.",
      B: "#pre_render callbacks receive the Render Array and can manipulate its structure; #post_render callbacks receive the finalized HTML string and the original array.",
      C: "#pre_render caches the array; #post_render invalidates the cache.",
      D: "#pre_render is executed before routing; #post_render after routing."
    },
    correct: "B",
    explanation: "#pre_render is used to modify the structured array elements before they are turned into HTML. #post_render allows string manipulation of the rendered HTML output immediately after generation."
  },
  // 🟢 Additional Developer Level
  {
    id: 41,
    difficulty: "developer",
    topic: "Site Building",
    question: "What is the purpose of 'Taxonomy' in Drupal?",
    options: {
      A: "To manage the site's automated cron tasks.",
      B: "To categorize and classify content using vocabularies and terms.",
      C: "To handle the site's database backups.",
      D: "To define the physical server path for file uploads."
    },
    correct: "B",
    explanation: "Taxonomy is Drupal's core categorization system. It allows you to create Vocabularies (like 'Tags' or 'Categories') which contain Terms that can be applied to content for organization and filtering."
  },
  {
    id: 42,
    difficulty: "developer",
    topic: "Site Building",
    question: "How do 'Image Styles' work in Drupal?",
    options: {
      A: "They allow you to automatically resize, crop, and apply effects to uploaded images.",
      B: "They are CSS stylesheets specifically written for image tags.",
      C: "They are a feature of the WYSIWYG editor to add borders to images.",
      D: "They convert all images to the WebP format upon upload."
    },
    correct: "A",
    explanation: "Image Styles process uploaded images through a pipeline of effects (scale, crop, desaturate, etc.), creating optimized derivative images for different display contexts without modifying the original upload."
  },
  {
    id: 43,
    difficulty: "developer",
    topic: "Theming",
    question: "What is a 'Region' in a Drupal theme?",
    options: {
      A: "A geographical setting for language translation.",
      B: "A predefined area in a page template (like Header, Sidebar, or Footer) where Blocks can be placed.",
      C: "A specific block of CSS code.",
      D: "A directory inside the theme folder for holding JavaScript."
    },
    correct: "B",
    explanation: "Regions are defined in a theme's .info.yml file and rendered in page.html.twig. Site builders can assign Blocks to these specific visual areas using the Block Layout interface."
  },
  {
    id: 44,
    difficulty: "developer",
    topic: "Core Modules",
    question: "Which core module is responsible for sending automated emails like password recovery and user registration notifications?",
    options: {
      A: "Contact",
      B: "System",
      C: "Mailer",
      D: "SMTP"
    },
    correct: "B",
    explanation: "The core System module handles default transactional emails via the default PhpMail plugin, though modules like Contact use this underlying system to send user-submitted messages."
  },
  {
    id: 45,
    difficulty: "developer",
    topic: "Module Development",
    question: "In Drupal's Form API, what array key is used to define an HTML text input field?",
    options: {
      A: "#type => 'textfield'",
      B: "input => 'text'",
      C: "#field_type => 'input'",
      D: "type => 'text_input'"
    },
    correct: "A",
    explanation: "Drupal's Form API uses a render array structure where elements are defined by keys prefixed with a hash. `#type => 'textfield'` tells the system to render a standard `<input type=\"text\">`."
  },

  // 🟡 Additional Mid-Level Developer
  {
    id: 46,
    difficulty: "mid-level",
    topic: "Form API",
    question: "How do you store arbitrary data during a multi-step form process without losing it between page reloads?",
    options: {
      A: "By saving it to `$_SESSION`.",
      B: "By writing to a temporary database table.",
      C: "By using the `$form_state->set()` and `$form_state->get()` methods.",
      D: "By embedding hidden input fields in the HTML."
    },
    correct: "C",
    explanation: "The FormState object ($form_state) persists across form submissions. Using `$form_state->set('my_key', $data)` caches the data on the server during AJAX requests or multi-step rebuilds."
  },
  {
    id: 47,
    difficulty: "mid-level",
    topic: "Services",
    question: "What is the purpose of 'Service Tags' in `services.yml`?",
    options: {
      A: "To assign CSS classes to the service output.",
      B: "To group related services together so that a 'Collector' service can find and use all of them dynamically.",
      C: "To cache the service in the database.",
      D: "To restrict access to the service based on user roles."
    },
    correct: "B",
    explanation: "Service tagging allows Drupal to automatically discover and aggregate services of a specific type (e.g., tagging an event subscriber with `event_subscriber` or a twig extension with `twig.extension`)."
  },
  {
    id: 48,
    difficulty: "mid-level",
    topic: "Routing",
    question: "How do you define a dynamic parameter in a route path (e.g., `/node/{node}`)?",
    options: {
      A: "Define it in the path string with curly braces, and Drupal's ParamConverter automatically attempts to upcast it to an object.",
      B: "Use a query string like `?node=1`.",
      C: "Use a regular expression in the path definition.",
      D: "Add an argument to the Controller's constructor."
    },
    correct: "A",
    explanation: "Enclosing a slug in curly braces `{entity_type}` tells the routing system it's a dynamic parameter. Drupal uses ParamConverters to automatically convert the ID (like `1`) into a fully loaded entity object before passing it to the Controller."
  },
  {
    id: 49,
    difficulty: "mid-level",
    topic: "Queue API",
    question: "Which API would you use to reliably process a large batch of expensive operations (like sending 10,000 emails) in the background?",
    options: {
      A: "The Batch API.",
      B: "The Cron API.",
      C: "The Queue API.",
      D: "The State API."
    },
    correct: "C",
    explanation: "The Queue API allows you to push items into a queue (stored in the database by default) and process them asynchronously during cron runs or via custom daemon workers, ensuring reliability and preventing timeouts."
  },
  {
    id: 50,
    difficulty: "mid-level",
    topic: "Database API",
    question: "When should you use the State API instead of the Configuration API?",
    options: {
      A: "When you need to sync the data between environments.",
      B: "When the data is environment-specific, not deployable, and can be lost without breaking the site (like 'last_cron_run').",
      C: "When the data represents content created by end users.",
      D: "When the data needs to be cached aggressively."
    },
    correct: "B",
    explanation: "The State API is for machine-generated, environment-specific data that shouldn't be deployed via config sync. Examples include timestamp of the last cron run or external API access tokens."
  },

  // 🔴 Additional Senior Developer
  {
    id: 51,
    difficulty: "senior",
    topic: "Entities",
    question: "How do you programmatically add a new base field (like a 'SKU' string field) to an existing custom Content Entity?",
    options: {
      A: "Implement `hook_entity_base_field_info()`.",
      B: "Add the field via the Field UI module in the browser.",
      C: "Create a database update script using `db_add_field()`.",
      D: "Add the property directly to the entity's table in PhpMyAdmin."
    },
    correct: "A",
    explanation: "While Field UI adds configurable fields, you add code-defined base fields by implementing `hook_entity_base_field_info()` (or adding to the entity class's `baseFieldDefinitions()` method), followed by an entity update manager script."
  },
  {
    id: 52,
    difficulty: "senior",
    topic: "Event Dispatcher",
    question: "If two modules subscribe to the exact same Event, how does Drupal determine which subscriber executes first?",
    options: {
      A: "Alphabetical module order.",
      B: "The subscriber defined with the higher numeric 'priority' value in its tag configuration executes first.",
      C: "The order they were installed.",
      D: "Event execution order cannot be controlled; it is purely random."
    },
    correct: "B",
    explanation: "When tagging a service as an `event_subscriber`, you can define a priority array. The EventDispatcher sorts listeners by this priority integer (highest first) before executing them."
  },
  {
    id: 53,
    difficulty: "senior",
    topic: "Cache API",
    question: "What must you return from a Controller to ensure its JSON API response can be cached effectively by the Dynamic Page Cache?",
    options: {
      A: "A standard `JsonResponse` object.",
      B: "A `CacheableJsonResponse` object with cache metadata attached.",
      C: "A plain PHP array passed through `json_encode`.",
      D: "A Render Array with `#type => 'json'`."
    },
    correct: "B",
    explanation: "Standard Symfony Response objects lack Drupal's cache metadata interfaces. By returning a `CacheableJsonResponse` (or `CacheableResponse`), you can add cache tags and contexts so the response is safely cached."
  },
  {
    id: 54,
    difficulty: "senior",
    topic: "Plugins",
    question: "When creating a completely new Custom Plugin Type, what is the core class you must extend to implement the plugin discovery mechanism?",
    options: {
      A: "PluginBase",
      B: "DefaultPluginManager",
      C: "ContainerFactoryPluginInterface",
      D: "AnnotationBase"
    },
    correct: "B",
    explanation: "To define a new plugin type, you create a 'Plugin Manager' service class that extends `DefaultPluginManager`. This class handles the discovery (where to look for plugins), instantiation, and caching of the plugin definitions."
  },
  {
    id: 55,
    difficulty: "senior",
    topic: "Performance",
    question: "What is 'Auto-Placeholdering' in the context of Drupal's Render API?",
    options: {
      A: "Automatically replacing missing images with a placeholder image.",
      B: "Automatically moving CSS/JS tags to the bottom of the HTML document.",
      C: "Drupal's automatic conversion of highly dynamic render arrays (like user-specific blocks) into `#lazy_builder` placeholders based on their cache contexts/max-age.",
      D: "A feature to populate empty form fields with default values."
    },
    correct: "C",
    explanation: "If a render array has high-cardinality cache contexts (like `user`) or a max-age of 0, Drupal's rendering system automatically intercepts it and swaps it for a `#lazy_builder` placeholder to ensure the parent page remains highly cacheable."
  }
];

// Helper to shuffle questions
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Font Styles (Injected into head via inline style)
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
  
  .font-heading {
    font-family: 'Space Mono', monospace;
  }
  .font-body {
    font-family: 'DM Sans', sans-serif;
  }
`;

export default function DrupalTutorApp() {
  const [screen, setScreen] = useState('start'); // start | quiz | results
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]); // tracks history: { id, correct, difficulty }

  const startQuiz = useCallback(() => {
    let filteredQuestions = [];
    
    if (selectedLevel === 'all') {
      const devQuestions = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'developer'));
      const midQuestions = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'mid-level'));
      const seniorQuestions = shuffleArray(QUESTIONS.filter(q => q.difficulty === 'senior'));
      filteredQuestions = [...devQuestions, ...midQuestions, ...seniorQuestions];
    } else {
      filteredQuestions = shuffleArray(QUESTIONS.filter(q => q.difficulty === selectedLevel));
    }

    setShuffledQuestions(filteredQuestions);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setScreen('quiz');
  }, [selectedLevel]);

  const handleAnswerClick = (optionKey) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks

    const currentQuestion = shuffledQuestions[currentIndex];
    const isCorrect = optionKey === currentQuestion.correct;
    
    setSelectedAnswer(optionKey);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => [...prev, {
      id: currentQuestion.id,
      isCorrect,
      difficulty: currentQuestion.difficulty
    }]);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 >= shuffledQuestions.length) {
      setScreen('results');
    } else {
      setSelectedAnswer(null);
      setCurrentIndex(prev => prev + 1);
    }
  };

  // Renders difficulty badge
  const renderDifficultyBadge = (difficulty) => {
    let colorClasses = "";
    let label = "";
    
    if (difficulty === "developer") {
      colorClasses = "bg-green-100 text-green-800 border-green-200";
      label = "Developer";
    } else if (difficulty === "mid-level") {
      colorClasses = "bg-yellow-100 text-yellow-800 border-yellow-200";
      label = "Mid-Level";
    } else {
      colorClasses = "bg-red-100 text-red-800 border-red-200";
      label = "Senior";
    }

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${colorClasses}`}>
        {label}
      </span>
    );
  };

  // Start Screen
  if (screen === 'start') {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-body">
        <style>{fontStyles}</style>
        <div className="max-w-2xl w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 text-center">
          <div className="w-24 h-24 bg-[#0678BE] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Layers size={48} className="text-white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-[#0678BE]">
            Drupal Tutor
          </h1>
          
          <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto leading-relaxed">
            Test your knowledge of modern Drupal 10 & 11 architecture. 
            From site-building basics to advanced plugin systems, caching, and dependency injection.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
            <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <h3 className="font-heading font-bold">Developer</h3>
              </div>
              <p className="text-sm text-slate-400">Core concepts, Views, Site Building, basics of Theming.</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                <h3 className="font-heading font-bold">Mid-Level</h3>
              </div>
              <p className="text-sm text-slate-400">Event Subscribers, Config Management, Migrations, Cache APIs.</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-400"></span>
                <h3 className="font-heading font-bold">Senior</h3>
              </div>
              <p className="text-sm text-slate-400">Performance tuning, architecture, Plugins, Deprecations.</p>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="text-lg font-heading font-bold mb-4 text-slate-300">Select Difficulty Level</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { id: 'all', label: 'All (Easy to Hard)' },
                { id: 'developer', label: 'Developer' },
                { id: 'mid-level', label: 'Mid-Level' },
                { id: 'senior', label: 'Senior' }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wider border transition-colors ${
                    selectedLevel === level.id 
                      ? 'bg-[#0678BE] border-[#0678BE] text-white' 
                      : 'bg-slate-800 border-slate-600 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={startQuiz}
            className="group flex items-center gap-2 mx-auto bg-[#0678BE] hover:bg-[#056099] text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105"
          >
            <Play fill="currentColor" size={20} />
            Start Assessment
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const totalQuestions = shuffledQuestions.length;
    const percentage = Math.round((score / totalQuestions) * 100) || 0;
    
    // Tier breakdowns
    const tiers = {
      developer: { total: 0, correct: 0, label: "Developer", color: "text-green-400" },
      "mid-level": { total: 0, correct: 0, label: "Mid-Level", color: "text-yellow-400" },
      senior: { total: 0, correct: 0, label: "Senior", color: "text-red-400" },
    };

    answers.forEach(ans => {
      if (tiers[ans.difficulty]) {
        tiers[ans.difficulty].total++;
        if (ans.isCorrect) tiers[ans.difficulty].correct++;
      }
    });

    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4 font-body">
        <style>{fontStyles}</style>
        <div className="max-w-2xl w-full bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700 text-center">
          <Trophy size={64} className={`mx-auto mb-6 ${percentage >= 80 ? 'text-yellow-400' : 'text-slate-400'}`} />
          
          <h2 className="text-3xl font-heading font-bold mb-2">Assessment Complete</h2>
          <p className="text-slate-400 mb-8">Here's how you performed across the Drupal ecosystem.</p>
          
          <div className="bg-slate-900 rounded-2xl p-8 mb-8 border border-slate-700">
            <div className="text-6xl font-heading font-bold text-[#0678BE] mb-2">
              {percentage}%
            </div>
            <div className="text-xl text-slate-300">
              {score} out of {totalQuestions} correct
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Object.entries(tiers).map(([key, data]) => (
              <div key={key} className="bg-slate-700/50 p-4 rounded-xl border border-slate-600">
                <h4 className={`font-heading font-bold mb-2 ${data.color}`}>{data.label}</h4>
                <div className="text-2xl font-bold">
                  {data.correct} <span className="text-sm text-slate-400 font-normal">/ {data.total}</span>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={startQuiz}
            className="flex items-center gap-2 mx-auto bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-full font-bold transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Quiz Screen
  const currentQuestion = shuffledQuestions[currentIndex];
  const progressPercent = ((currentIndex + 1) / shuffledQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-body">
      <style>{fontStyles}</style>
      
      {/* Header / Progress bar */}
      <header className="bg-slate-800 border-b border-slate-700 p-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex justify-between items-center mb-4">
          <div className="flex items-center gap-2 text-[#0678BE] font-heading font-bold text-xl">
            <Layers />
            <span>Drupal Tutor</span>
          </div>
          <div className="font-heading font-bold bg-slate-700 px-4 py-1 rounded-full text-sm">
            Score: <span className="text-[#0678BE]">{score}</span> / {shuffledQuestions.length}
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between text-xs text-slate-400 mb-2 font-heading">
            <span>Question {currentIndex + 1} of {shuffledQuestions.length}</span>
            <span>{Math.round(progressPercent)}% completed</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div 
              className="bg-[#0678BE] h-2.5 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 py-8">
        <div className="max-w-3xl w-full">
          
          {/* Question Card */}
          <div className="bg-slate-800 rounded-2xl shadow-xl border border-slate-700 overflow-hidden transition-all">
            
            <div className="p-6 md:p-8 border-b border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                {renderDifficultyBadge(currentQuestion.difficulty)}
                <span className="flex items-center gap-2 text-sm text-slate-400 font-heading bg-slate-900 px-3 py-1 rounded-full">
                  <Code size={14} /> {currentQuestion.topic}
                </span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-heading font-bold leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            <div className="p-6 md:p-8 bg-slate-800/50">
              <div className="space-y-3">
                {Object.entries(currentQuestion.options).map(([key, text]) => {
                  const isSelected = selectedAnswer === key;
                  const isCorrectAnswer = currentQuestion.correct === key;
                  
                  let buttonStyles = "bg-slate-700 hover:bg-slate-600 border-slate-600 text-slate-200";
                  let icon = null;

                  if (selectedAnswer !== null) {
                    if (isCorrectAnswer) {
                      buttonStyles = "bg-green-900/30 border-green-500 text-green-100 ring-1 ring-green-500";
                      icon = <CheckCircle className="text-green-400 flex-shrink-0" />;
                    } else if (isSelected) {
                      buttonStyles = "bg-red-900/30 border-red-500 text-red-100 ring-1 ring-red-500 opacity-80";
                      icon = <XCircle className="text-red-400 flex-shrink-0" />;
                    } else {
                      buttonStyles = "bg-slate-800 border-slate-700 text-slate-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => handleAnswerClick(key)}
                      disabled={selectedAnswer !== null}
                      className={`w-full text-left p-4 rounded-xl border flex items-center justify-between gap-4 transition-all duration-200 ${
                        selectedAnswer === null ? 'hover:-translate-y-0.5 hover:shadow-lg' : 'cursor-default'
                      } ${buttonStyles}`}
                    >
                      <div className="flex items-start gap-4">
                        <span className="font-heading font-bold text-slate-400 mt-0.5">{key}.</span>
                        <span className="text-base md:text-lg">{text}</span>
                      </div>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {selectedAnswer !== null && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className={`p-6 rounded-xl border ${
                    selectedAnswer === currentQuestion.correct 
                      ? 'bg-green-900/20 border-green-800/50' 
                      : 'bg-red-900/20 border-red-800/50'
                  }`}>
                    <h3 className="font-heading font-bold flex items-center gap-2 mb-2">
                      <BookOpen size={18} />
                      {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={nextQuestion}
                      className="flex items-center gap-2 bg-[#0678BE] hover:bg-[#056099] text-white px-6 py-3 rounded-full font-bold transition-colors"
                    >
                      {currentIndex + 1 >= shuffledQuestions.length ? 'See Results' : 'Next Question'}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
