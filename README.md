# DB設計	
## groups_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
### Association
- belongs_to :group
- belongs_to :user

## user table
|Column|Type|Options|
|------|----|-------|
|user_name|string|null:false|
|email|string|null:false, unique:true|
|password|string|null:false|
## Association
- has_many :messages
- has_many :groups

## message table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null:false, foreign_key:true|
|user_id|integer|null:false, foreign_key:true|
## Association
- belongs_to :user
- belongs_to :group

## group table
|Column|Type|Options|
|------|----|-------|
|name|string|null:false|
## Association
- has_many :messages
- has_many :users, through: :groups_users

