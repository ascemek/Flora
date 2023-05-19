//Nicolas Pitcher
//Chloe Jones

module.exports = {
  createPost: async function(req, res) {
    try {
      const userId = req.session.userId;
      const body = req.param('body');

      if (!userId || !body) { // Check if user ID and body are provided
        return res.send({
          error: 'User ID and body required'
        });
      }
      if(body.length < 1) { // Check if body is too short
        return res.send({
          error: 'Body must be at least 1 character'
        });
      }
      if (body.length > 500) { // Check if body is too long
        return res.send({
          error: 'Body must be less than 500 characters'
        });
      }

      await Forum.create({
        userID: userId,
        body: body
      });
      return res.send({ // Return success
        success: true
      });

    } catch (error) {
      return res.send({ // Return error if user doesn't exist
        error: 'Error creating post'
      });
    }
  },
  fetchPosts: async function(req, res) {
    try {
      const posts = await Forum.find({}).populate('userID').populate('reply');
      const users = await Users.find({});
      for( i=0; i< posts.length; i++){
        for(j=0; j< posts[i].reply.length; j++){
          posts[i].reply[j].userID = users.find((user)=> {return user.id===posts[i].reply[j].userID});
        }
      }
      return res.view('pages/forum', {
        postdata:JSON.stringify(posts)
        //postdata:JSON.stringify(combinedPosts)
      }
      );
    } catch (error) {
      console.log(error);
    }
  },

  createReply: async function(req, res) {
    try {
      const userId = req.session.userId;
      const body = req.param('body');
      const forum = req.param('forum'); 

      if (!userId || !body) { // Check if user ID and body are provided
        return res.send({
          error: 'User ID and body required'
        });
      }
      if(body.length < 1) { // Check if body is too short
        return res.send({
          error: 'Body must be at least 1 character'
        });
      }
      if (body.length > 500) { // Check if body is too long
        return res.send({
          error: 'Body must be less than 500 characters'
        });
      }

      await Reply.create({
        userID: userId,
        body: body,
        forumID: forum,
      });
      return res.send({ // Return success
        success: true
      });

    } catch (error) {
      return res.send({ // Return error if user doesn't exist
        error: 'Error creating post'
      });
    }
  },
  fetchReplies: async function(req, res) {
    try {
      const replies = await Reply.find({}).populate('userID'); 
      return res.view('pages/forum', {
        replydata:JSON.stringify(replies)
      }
      );
    } catch (error) {

    }
  }
};

