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
      const posts = await Forum.find({}).populate('userID');
      return res.view('pages/forum', {
        postdata:JSON.stringify(posts)
      }
      );
    } catch (error) {

    }
  }
};

