---
sidebar_position: 2
---

# Contribution workflow

## Pull request workflow

The so-called "PR workflow" used by Orchestrator is common to many projects using Git, and should be familiar to veteran free software contributors.
The idea is that only a small number (if any) commit directly to the master branch.
Instead, contributors fork the project (i.e. create a copy of it, which they can modify as they wish), and then use the GitHub interface to request a pull from one of their fork's branches to one branch of the original (often named upstream) repository.

The resulting *pull request* (PR) can then be reviewed by other contributors, which might approve it, reject it, or most often request that modifications be done.
Once approved, the PR can then be merged by one of the core developers, and its commit(s) will become part of the target branch (usually the master branch).

We will go together through an example to show the typical workflow and associated Git commands. 
But first, let's have a quick look at the Orchestrator Git repository.

### Git source repository

The <ExternalLink href="https://github.com/Vahera/godot-orchestrator">repository on GitHub</ExternalLink> is a <ExternalLink href="https://git-scm.com/">Git</ExternalLink> code repository together with an embedded issue tracker and PR system.

:::info
If you are contributing to the documentation, its repository can be found <ExternalLink href="https://github.com/Vahera/godot-orchestrator-docs">here</ExternalLink>.
:::

The branches on the Git repository are organized as follows:

* The `main` branch is where development for the next major version occurs.
As a development branch, it's considered unstable and not meant for production use.
This is where pull requests should __always__ be done.
* The stable branches are named after their respective version, e.g. `1.1` and `2.0`.
They are used to backport bugfixes and enhancements from the `main` branch to the currently maintained stable release.
As a rule of thumb, the last stable branch is maintained until the next minor version (e.g. the `2.0` branch maintained until `2.1.`).
If you want to open pull requests against a stable branch, please check first if your changes are relevant for the `main` branch, and make the PR against `main` if so.
The core team will cherry-pick from `main` if they believe the change should be included in a maintenance release for a stable branch.

### Forking and cloning

The first step to contributing is to _fork_ the repository on GitHub.
To do so, you must have a GitHub account, be logged in, and click the button in the top right that reads "Fork".
You will need to answer a series of questions. Once complete, you will find a repository under your username in the URL with the same upstream repository name of `godot-orchestrator`.

Once you have forked the repository, it's time to make a local copy, so you can more easily make changes.
In Git speak, you must clone your fork to your local computer.
To clone your repository, use the following command in a terminal window:

```bash
git clone https://github.com/<USERNAME>/godot-orchestrator.git
```

After Git has cloned the repository, you will find a new directory called `godot-orchestrator`.
Next, change directories into the `godot-orchestrator` directory and execute the following commands:

```bash
git remote add upstream https://github.com/Vahera/godot-orchestrator.git
git fetch upstream
```

The above creates a reference named `upstream` to the original `godot-orchestrator` repository maintained by Crater Crash Studios.
This reference will be helpful because you want to keep your local repository up-to-date with new commits added to the original repository.
You will also have another reference to `origin`, which points to your _fork_ repository on GitHub.

### Rebasing changes on conflicts

Ideally, it would help if you created a feature or bugfix branch locally.
This branch is where you will make all the necessary changes to add your new feature or bug fix.

When submitting pull requests for code changes, the commit history should be linear, not contain merge commits, and be free of merge conflicts.
If you contribute a pull request and GitHub states there are conflicts, consider pulling down the latest upstream changes and rebasing your work on those changes before opening the pull request.

Assuming you have set up the `upstream` reference and you have committed all your changes in your local fork's branch, execute the following commands to rebase:

```bash
git checkout main
git pull upstream main
git checkout <your branch>
git rebase main
```

If there are conflicts, you must compare the upstream changes with your local changes in your feature branch.
You can continue the rebase by running `git rebase --continue` after resolving all conflicts.
Once the rebase has finished, you must update your feature branch using `push --force` to your GitHub fork's branch.
