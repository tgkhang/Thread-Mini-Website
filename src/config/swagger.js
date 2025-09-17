const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Thread Mini Website API',
      version: '1.0.0',
      description: 'A mobile-optimized social network web application API documentation',
      contact: {
        name: 'Thread Mini Website',
        email: 'support@threadmini.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'http://localhost:4000',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        sessionAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session-based authentication using cookies'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID'
            },
            userName: {
              type: 'string',
              description: 'Username'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address'
            },
            firstName: {
              type: 'string',
              description: 'First name'
            },
            lastName: {
              type: 'string',
              description: 'Last name'
            },
            avatar: {
              type: 'string',
              description: 'Avatar image URL'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Thread: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Thread ID'
            },
            content: {
              type: 'string',
              description: 'Thread content'
            },
            imageUrl: {
              type: 'string',
              description: 'Thread image URL'
            },
            userId: {
              type: 'integer',
              description: 'Author user ID'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            likesCount: {
              type: 'integer',
              description: 'Number of likes'
            },
            commentsCount: {
              type: 'integer',
              description: 'Number of comments'
            }
          }
        },
        Comment: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Comment ID'
            },
            content: {
              type: 'string',
              description: 'Comment content'
            },
            userId: {
              type: 'integer',
              description: 'Commenter user ID'
            },
            threadId: {
              type: 'integer',
              description: 'Thread ID'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Notification ID'
            },
            type: {
              type: 'string',
              enum: ['like', 'comment', 'follow'],
              description: 'Notification type'
            },
            message: {
              type: 'string',
              description: 'Notification message'
            },
            userId: {
              type: 'integer',
              description: 'Recipient user ID'
            },
            isSeen: {
              type: 'boolean',
              description: 'Whether notification has been seen'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            status: {
              type: 'integer',
              description: 'HTTP status code'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Success message'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        }
      }
    },
    security: [
      {
        sessionAuth: []
      }
    ]
  },
  apis: [
    './src/routes/*.js',
    './src/controllers/*.js'
  ]
};

const specs = swaggerJSDoc(options);

module.exports = {
  specs,
  swaggerUi
};