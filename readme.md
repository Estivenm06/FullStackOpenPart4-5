<h1>FullStackOpen Part4&5 Merged for exercise 11.20 Your Own Pipeline</h1>
<h2>Now doing exercise 11.21 and now wait for mluukkai's review</h2>

<strong>Full Stack Open Pokedex repository: https://github.com/Estivenm06/full-stack-open-pokedex</strong>

Exercise 11.1

Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked?

The common tools for Ruby CI/CD pipelines are:
<h2>Linting</h2>
RuboCop: A popular static code analyzer that checks Ruby code against a configurable set of rules.
<h2>Testing</h2>
Minitest: A built-in testing framework taht comes with Ruby's standard library.
<h2>Building</h2>
Bundler: A dependency management tool that ensures the project has the correct versions of all necessary gems.
Those are my common tools for Ruby

What alternatives are there to set up the CI besides Jenkins and GitHub Actions?

Cloud-Based CI/CD Platforms:
CircleCI: Known for its user-friendly interface and fast build times.
Travis CI: A popular choice for open-source projects, especially those hosted on GitHub.
GitLab CI/CD: Integrated with GitLab, offering a complete DevOps platform.

Self Hosted CI/CD Platforms:
Drone: A lightweight and flexible CI/CD platform that can be self-hosted.
Buildkite: A powerful and customizable CI/CD platform that can be self-hosted or cloud-based.

Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?

The choice between self-hosted and cloud-based CI/CD depends on several factors, including the specific needs, resources, and security requirements.
Key considerations:
1. Security
2. Cost
3. Scalability
4. Maintenance
5. Control

And about the information that I need you make this decision are:
1. My team size and Expertise
2. Security Requirements
3. Budget
4. Scalability Needs
5. Desired Level of Control