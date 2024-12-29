# Randomisation page design
page responsible for opening session and allowing user to perform tab opening actions

main features:

- url query to select session
- 1 big button to do action
    - generate new links or open current links
- smaller button to do the other actions
    - either "skip" or "open again"
- all current links should be displayed
- current links is always the current position of the session plus some number
    - when page opens, it should always start on "open", as otherwise its boilerplate to click generate
- items should be displayed with icon
    - items should be clickable to open in background, and should become faded when clicked
- on pressing generate, advances the position, and retrieves new items based on the new position
    - on position change, update last updated date
- display progress with big bar
    - `consumed items / total items`
- display information of session
    - title of session
    - origin dirs of the session
    - create/update date
- indicator of how many items went through in the current tab. to give an idea of how many have seen so far
- clicking open, should immediately move to the 1st tab opened
- number count next to each bookmark item like from prev

# other ideas
- with the single button, still need to press it twice to open. does this get annoying? what about a generate and open button, or checkbox that enables this
- it makes sense to have at least some button that generates without opening, as there is use case of picking items to open
- later can add ability to set number of items displayed, but that wasnt used in the previous iteration, so for now will lock at 10
- might be interesting to display for each origin dir, the number per origin dir, and the number consumed per origin dir
    - this would require some restructuring of the session data as items don't know their origin dir currently without searching for it

# prototype ui requirements
based on features, here are the components to fulfil the features

- [ ] main action button
- [ ] sub action button
- [ ] url query session load system
- [ ] links display
- [ ] session information display
- [ ] progress bar