# randomisation page
- [x] setup page
- [x] design layout
- [x] add secondary progress counter
- [x] url query for data loading
- [x] selector page links to randomiser page using url query
- [ ] design out page randomisation position logic
- [ ] get components functional

# general
- [ ] back buttons on all pages to go to select page
- [ ] target date displays and change to "relative time" dates (ex: 10 days ago)

# main page
- [x] setup main page
- [x] design initial list of session blocks
- [x] add button to go to session create page
- [x] implement actual session creation
    - [x] design local storage typing
    - [x] function to create a session
    - [x] function to add session to localstorage
    - [x] have session create page button call this function. should also navigate back to session select after creating
    - [x] function to collect bookmark items from list of bookmark folders
    - [x] update session create to use the retrieved bookmark items
- [x] dont allow pressing submit button if no items selected
- [x] render sessions in storage
- [x] add clear sessions button
- [x] items list not working
- [x] figure out what to do for the title
- [x] order by last updated
- [x] text when there is no sessions
- move on to randomisation page

# session create
- [x] session create page, which is basically bookmark tree navigator
    - would like to be able to select multiple folders
    - selected folders should appear on a list, each folder should say how many items it has
    - have a total of items for all selected folders
    - click button to create session. later when create session page, this button should navigate to the newly created session
- [x] look into bookmarks api to start rendering bookmarks browser
- [x] render the top level page of items
- [x] navigation when clicking on items
- [x] functional path display with jumping when clicking
- [x] track user selections
- [x] modify selection component to use ids instead of paths
- [x] modify selection component to also have paths of each selected item
- [x] modify path component to use bookmark item objs instead of path arrays
- [x] user selection should work in path component
- [x] show user selections in checkout area. should display number of items per selection
- [x] check out area totals counter
- [x] click items in check out to remove

## 2
- [x] optimise selected bookmark paths checking. could try hashing the bookmark paths so dont need to do array comparisons
    - completed now using ids for selected items instead of path comparison