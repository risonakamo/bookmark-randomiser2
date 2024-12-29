# main features
- session based randomising
    - user selects folder to create new session. session remembers their progress and they can return to it
    - user should be able to delete sessions
    - sessions ordered in last time user accessed and performed an action in the session
    - sessions should show this information:
        - percent progress bar of getting through the items
        - date session was created
        - last date session was modified
    - user should be able to press button to duplicate the sesssion (which also shuffles it)
        - not sure if should allow user to reset current session. for now, don't add this until seems like would be useful
    - potential to allow user to see "previous generated sets", as it may be useful to check a previously generated set for some reason
- list of recently accessed folders
    - based on the user creating sessions
    - not exactly sure if this is going to be useful with the sessions, so it can be lower priority unless it seems like users like to continuously refresh sessions
- 1 button to generate/open tabs
    - previously, too confusing to figure out which button to press. there should only be 1 button and it should be context aware to what it should do
- figure out if there is an easier way of access the page. previously it was too low incentive to try to find the bookmark randomiser button in the extension menu
    - maybe the minimum is to try a unique icon so it can be found more easily
- session create page allowing for multiple folder selections

# other considerations
- in session objs, it is currently storing the whole list of all bookmark item objects which is kind of needlessly expensive. later optimise so only stores the ids, and when needed can upgrade to full obj
- session title needs to help user to find the one they are looking for. need to test to see what works
- accessing the page is annoying if need to search through the extensions menu. is there another option? can it appear in the omnibar if type certain words? maybe try bookmarking the page