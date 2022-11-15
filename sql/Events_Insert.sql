USE [C120_cstannahill10_gmail]
GO
/****** Object:  StoredProcedure [dbo].[Events_Insert]    Script Date: 11/15/2022 12:45:01 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


	
	ALTER Proc [dbo].[Events_Insert]
								
								  @Name nvarchar(50)
								  ,@Headline nvarchar(120)
								  ,@Description nvarchar(1000)
								  ,@Summary nvarchar(255)
								  ,@Slug nvarchar(100)
								  ,@StatusId int
								  ,@UserId int
								  ,@DateStart datetime2(7)
								  ,@DateEnd datetime2(7)
								  ,@Address nvarchar(128)
								  ,@ZipCode nvarchar(10)
								  ,@Latitude decimal(11,8)
								  ,@Longitude decimal(11,8)
								  ,@Url nvarchar(255)
								  ,@TypeId int
								  ,@Id int OUTPUT

	
as 



/*

	Select *
	From dbo.Events

	Declare @Name nvarchar(50) = 'Test Event'
			,@Headline nvarchar(120) = 'Test Headline'
			,@Description nvarchar(1000) = 'Test Description of test event.'
			,@Summary nvarchar(255) = 'Test summary'
			,@Slug nvarchar(100) = 'Test summary'
			,@StatusId int = 1
			,@UserId int = 1
			,@DateStart datetime2(7) = '2022-12-10 20:00:00.0000000'
			,@DateEnd datetime2(7) = '2022-12-10 23:00:00.0000000'
			,@Address nvarchar(128) = '209 E Washington St #1, Bloomington, IL'
			,@ZipCode nvarchar(10) = '61701'
			,@Latitude decimal(11,8)  = 40.48060421638542 
			,@Longitude decimal(11,8) = -88.99275082802792
			,@Url nvarchar(255) = 'https://edm.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTczMTUyMDE3NzgxMzY4MzUy/lollapalooza.jpg' 
			,@TypeId int = 1
			,@Id int


		
			Execute Events_Insert					 
								@Name
								,@Headline
								,@Description
								,@Summary
								,@Slug
								,@StatusId
								,@UserId
								,@DateStart
								,@DateEnd
								,@Address
								,@ZipCode
								,@Latitude
								,@Longitude
								,@Url
								,@TypeId
								,@Id OUTPUT

	Select *
	From dbo.Events


*/

BEGIN

	Declare @PrimaryImageId int = 0
	INSERT INTO dbo.Images
			([Url]
			,[TypeId])

		Values
			(@Url
			,@TypeId)	

		Set @PrimaryImageId = SCOPE_IDENTITY()

	INSERT INTO [dbo].[Events]
           ([Name]
           ,[Headline]
           ,[Description]
           ,[Summary]
           ,[Slug]
           ,[StatusId]
		   ,PrimaryImageId
           ,[UserId]
           ,[DateStart]
           ,[DateEnd]
           ,[Address]
           ,[ZipCode]
           ,[Latitude]
           ,[Longitude])
     
      VALUES     
			(@Name
			,@Headline
			,@Description
			,@Summary
			,@Slug
			,@StatusId
			,@PrimaryImageId
			,@UserId
			,@DateStart
			,@DateEnd
			,@Address
			,@ZipCode
			,@Latitude
			,@Longitude)

			SET @Id = SCOPE_IDENTITY()


END

