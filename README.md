
# Setting up this integration for yourself #

In order for this to work you need to have a Slack **Workspace**, a **Slack app** with **Slash Commands** & **billed** boolean field(**case-sensitive**) in your SashiDo App's **User** class.

If you already have a Workspace & Slack App, skip to [Setting up Slash Commands](#setting-up-slash-commands)

Copy the content of the **app.js** file to your own SashiDo App's **app.js** file. It can be found in your **GitHub Repo -> Cloud** folder.

## Setting up your SashiDo App ##

1. Navigate to **Dashboard -> Your App -> Core -> Browser -> _User_ Class**.
1. Create a new column of type **boolean** and name it **billed**.
1. If you don't have any entries in the **User** class, add some users and set the **billed** field of some of them to **false**
     * Easiest and fastest way to add new entries in your **User** class is to go to **Dashboard -> Your App -> Core -> API Console**.
     * For **Request Type** choose **POST**, be sure to check the **Use MasterKey** toggle to be **true**.
     * Set the endpoint to **classes/\_User**.
     * In **Query Parameters** type **{"username":"someUsername","password":"somePassword","billed": false}** and hit **Send Query**.

## Setting up Slack ##

1. Go to [Slack](https://slack.com/create#email) and create your own Workspace.
1. After that, create a new [**Slack App**](https://api.slack.com/apps?new_app=1). Name it whatever you want and select the Workspace in which you want to implement it.
1. Navigate to [**Slash Commands**](https://api.slack.com/apps/ABQ3T3QFP/slash-commands?) in the section **Add features and functionality** and click on **Create New Command**.
     * For **Command** type **/unbilled** (this is the name of your Slash Command).
     * In **Request URL** type your **ServerURL** + the route we defined in the **app.js** file. You can find your SashiDo App's **ServerURL** in **Dashboard -> Your App -> App Settings -> Security & Keys -> API URL Address**. Just replace the **/1/** at the end with **/getUnbilledUsers**. It shoud look something like this - "https://pg-app-sd5ez1yjgta5vksvux7wdfjwiykcpt.scalabl.cloud/getUnbilledUsers".
     * Add a short description to the command and optionally a hint, then click on **Save**.
     * Repeat for the **/bill** Slash Command. Just replace the **Request URL** endpoint to **/billUser** (that's our second route handler in the **app.js** file).

## Test it out! ##

Now head to your Slack Workspace and test the Slash Commands in any **#channel**!
     
